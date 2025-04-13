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
