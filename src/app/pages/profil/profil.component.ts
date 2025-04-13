import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Order } from '../../shared/models/Orderss';
import { OrderHistoryComponent } from './order-history/order-history.component';


interface User {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
  createdAt: Date;
}

@Component({
  selector: 'app-profil',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    OrderHistoryComponent
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  editMode = false;

  user = {
    name: { firstname: 'Kertész', lastname: 'János' },
    email: 'janos@kert.hu',
    createdAt: new Date(2024, 2, 1),
    password: 'password123'
  };

  orders: Order[] = [
    {
      id: 1001,
      date: '2024-03-10',
      total: 5990,
      items: [
        { product: 'Bazsalikom magok', quantity: 2, unitPrice: 1000 },
        { product: 'Ültetőkanál', quantity: 1, unitPrice: 990 },
        { product: 'Kókuszföld', quantity: 1, unitPrice: 3000 }
      ]
    },
    {
      id: 1002,
      date: '2024-04-01',
      total: 18990,
      items: [
        { product: 'Fém locsolókanna 5L', quantity: 1, unitPrice: 5000 },
        { product: 'Paradicsom palánta', quantity: 5, unitPrice: 200 },
        { product: 'Bio komposzt', quantity: 3, unitPrice: 2000 }
      ]
    }
  ];

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstname: [this.user.name.firstname],
      lastname: [this.user.name.lastname],
      email: [this.user.email]
    });
  }

  saveChanges() {
    if (this.profileForm.valid) {
      this.user = {
        ...this.user,
        name: {
          firstname: this.profileForm.value.firstname,
          lastname: this.profileForm.value.lastname
        },
        email: this.profileForm.value.email
      };
      this.editMode = false;
    }
  }
}
