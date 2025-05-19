import { AngularFireStorageReference } from './../../../../node_modules/@angular/fire/compat/storage/ref.d';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/Products';
import { PriceFormatPipe } from '../../shared/pipes/price-format.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrdersService } from '../../shared/services/orders.service';
import { Order } from '../../shared/models/Orderss';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    PriceFormatPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: (Product & { quantity: number })[] = [];

  constructor(
  private ordersService: OrdersService,
  private productService: ProductService
) {}

async placeOrder() {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    alert('Be kell jelentkezni rendeléshez!');
    return;
  }

  const orderItems = this.cartItems.map(item => ({
    productId: item.id.toString(),
    productName: item.name,
    quantity: item.quantity,
    unitPrice: item.price
  }));

  const newOrder: Order = {
    userEmail: userEmail,
    createdAt: new Date(),
    total: this.getTotal(),
    items: orderItems
  };

  try {
    await this.ordersService.saveOrder(newOrder);

    for (const item of this.cartItems) {
      await this.productService.decreaseStock(item.id.toString(), item.quantity);
    }

    this.clearCart();
    alert('Rendelés sikeresen leadva!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert('Hiba a rendelés leadásakor: ' + error.message);
    } else {
      alert('Hiba a rendelés leadásakor');
    }
  }
}


  ngOnInit() {
    this.loadCart();
  }


  addToCart(product: Product) {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    alert('Be kell jelentkezni a vásárláshoz!');
    return;
  }

  const cartKey = `cart_${userEmail}`;
  const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const existingItem = cart.find((item: Product & { quantity: number }) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(`${product.name} hozzáadva a kosárhoz!`);
}

  loadCart() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const cartKey = `cart_${userEmail}`;
    this.cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
  }

  saveCart() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const cartKey = `cart_${userEmail}`;
    localStorage.setItem(cartKey, JSON.stringify(this.cartItems));
  }

  increaseQuantity(item: Product & { quantity: number }) {
    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(item: Product & { quantity: number }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: Product & { quantity: number }) {
    this.cartItems = this.cartItems.filter(p => p.id !== item.id);
    this.saveCart();
  }

  clearCart() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const cartKey = `cart_${userEmail}`;
    localStorage.removeItem(cartKey);
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
