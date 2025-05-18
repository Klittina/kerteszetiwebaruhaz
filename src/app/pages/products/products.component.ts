import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Product } from '../../shared/models/Products';
import { ProductService } from '../../shared/services/product.service';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ProductItemComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [
  'Palánta',
  'Vetőmag',
  'Cserepes növény',
  'Gyümölcsfa csemete',
  'Évelő növény',
  'Egynyári virág',
  'Szobanövény',
  'Fűmag',
  'Trágya és komposzt',
  'Föld és talajjavító',
  'Permetszer és növényvédelem',
  'Bio kertészeti termék',
  'Kerti kéziszerszám',
  'Kerti gép',
  'Öntözéstechnika',
  'Kaspó és virágtartó',
  'Kerti dekoráció',
  'Kerti bútor',
  'Üvegház és fóliasátor',
  'Mulcs és fakéreg'
];

  filterForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: [''],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();

    // Opció: figyeld a szűrő változásokat is, ha azonnal frissíteni akarod a listát
    this.filterForm.valueChanges.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    const { category, minPrice, maxPrice } = this.filterForm.value;

    // Átalakítjuk a price értékeket számra, vagy undefined-ra, ha nem töltötték ki
    const min = minPrice !== '' ? Number(minPrice) : undefined;
    const max = maxPrice !== '' ? Number(maxPrice) : undefined;

    this.productService.getProductsFiltered(category || undefined, min, max).subscribe(data => {
      this.products = data;
    });
  }

  handleAddToCart(product: Product) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.warn('Nem vagy bejelentkezve.');
      return;
    }

    const cartKey = `cart_${userEmail}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const index = existingCart.findIndex((p: Product) => p.id === product.id);

    if (index >= 0) {
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    console.log('Kosár frissítve:', existingCart);
  }
}
