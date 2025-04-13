import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PriceFormatPipe } from '../../../shared/pipes/price-format.pipe';

export interface OrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, MatCardModule, PriceFormatPipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {

  @Input() orders: Order[] = [];
}
