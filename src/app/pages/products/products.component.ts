import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-products',
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
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Ültető lapát',
      category: 'Szerszám',
      price: 890,
      stock: 35,
      imageUrl: 'ultetolapat.jpg'
    },
    {
      id: 2,
      name: 'Ásó',
      category: 'Szerszám',
      price: 4590,
      stock: 20,
      imageUrl: 'aso.jpg'
    },
    {
      id: 3,
      name: 'Metszőolló',
      category: 'Szerszám',
      price: 3290,
      stock: 42,
      imageUrl: 'metszoollo.jpg'
    },
    {
      id: 4,
      name: 'Levendula palánta',
      category: 'Növény',
      price: 1290,
      stock: 60,
      imageUrl: 'levendula.jpg'
    },
    {
      id: 5,
      name: 'Paradicsom vetőmag',
      category: 'Vetőmag',
      price: 590,
      stock: 150,
      imageUrl: 'paradicsommag.jpg'
    },
    {
      id: 6,
      name: 'Virágföld 20L',
      category: 'Kiegészítő',
      price: 1990,
      stock: 80,
      imageUrl: 'viragfold.jpg'
    },
    {
      id: 7,
      name: 'Bio tápoldat 500ml',
      category: 'Tápoldat',
      price: 1390,
      stock: 95,
      imageUrl: 'tapoldat.png'
    },
    {
      id: 8,
      name: 'Petúnia (rózsaszín)',
      category: 'Növény',
      price: 990,
      stock: 40,
      imageUrl: 'petunia.jpg'
    },
    {
      id: 9,
      name: 'Permetező kanna 5L',
      category: 'Kiegészítő',
      price: 3990,
      stock: 25,
      imageUrl: 'permetezo.jpg'
    },
    {
      id: 10,
      name: 'Locsolócső 15m',
      category: 'Kiegészítő',
      price: 4990,
      stock: 18,
      imageUrl: 'locsolocso.jpg'
    },
    {
      id: 11,
      name: 'Fűmag keverék 1kg',
      category: 'Vetőmag',
      price: 2690,
      stock: 55,
      imageUrl: 'fumag.png'
    },
    {
      id: 12,
      name: 'Zsálya palánta',
      category: 'Növény',
      price: 1190,
      stock: 38,
      imageUrl: 'zsalya.jpg'
    },
    {
      id: 13,
      name: 'Gyomláló szerszám',
      category: 'Szerszám',
      price: 2490,
      stock: 30,
      imageUrl: 'gyomlalo.png'
    },
    {
      id: 14,
      name: 'Műanyag virágcserép 25cm',
      category: 'Kiegészítő',
      price: 990,
      stock: 100,
      imageUrl: 'muanyagviragcserep.jpg'
    },
    {
      id: 15,
      name: 'Eper palánta',
      category: 'Növény',
      price: 1490,
      stock: 65,
      imageUrl: 'eperpalanta.png'
    },
    {
      id: 16,
      name: 'NPK műtrágya 10kg',
      category: 'Tápoldat',
      price: 1990,
      stock: 75,
      imageUrl: 'npkmutragya.jpg'
    },
    {
      id: 17,
      name: 'Uborka vetőmag',
      category: 'Vetőmag',
      price: 490,
      stock: 140,
      imageUrl: 'uborkamag.jpg'
    },
    {
      id: 18,
      name: 'Komposztáló láda 300L',
      category: 'Kiegészítő',
      price: 17990,
      stock: 5,
      imageUrl: 'komposztalo.jpg'
    },
    {
      id: 19,
      name: 'Balkonládás virágtartó',
      category: 'Kiegészítő',
      price: 3490,
      stock: 28,
      imageUrl: 'viragtarto.jpg'
    },
    {
      id: 20,
      name: 'Rozsdamentes ásó',
      category: 'Szerszám',
      price: 6990,
      stock: 12,
      imageUrl: 'rozsdamentesaso.jpg'
    }
  ];

  handleAddToCart(product: Product) {
    console.log('Kosárba rakva:', product);
    // Itt jöhet később a kosár logika
  }
}
