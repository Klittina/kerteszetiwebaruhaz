export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id?: string;
  userEmail: string;
  createdAt: Date;
  total: number;
  items: OrderItem[];
}
