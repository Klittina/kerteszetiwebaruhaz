import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PriceFormatPipe } from '../../../shared/pipes/price-format.pipe';
import { Order } from '../../../shared/models/Orderss';
import { DatetimeShortPipe } from '../../../shared/pipes/datetime-short.pipe';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, MatCardModule, PriceFormatPipe, DatetimeShortPipe],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  @Input() orders: Order[] = [];
}
