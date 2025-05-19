import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Product } from '../../../shared/models/Products';
import { PriceFormatPipe } from '../../../shared/pipes/price-format.pipe';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-product-item',
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
    PriceFormatPipe
  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Input() isAdmin: boolean = false;

  @Output() addToCart = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  constructor(private authService: AuthService) {}

ngOnInit() {
  const user = this.authService.getUserData();
  this.isAdmin = user?.role === 'a';
  console.log('Szülő komponens isAdmin:', this.isAdmin);
}

  onAddToCartClick(): void {
    this.addToCart.emit(this.product);
  }

  onDeleteClick(): void {
    this.delete.emit(this.product.id);
  }
}
