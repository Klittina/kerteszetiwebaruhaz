import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { Order } from '../models/Orderss';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private firestore: Firestore) {}

  async saveOrder(order: Omit<Order, 'id'>) {
    const ordersRef = collection(this.firestore, 'orders');
    const orderToSave = {
      ...order,
      createdAt: Timestamp.fromDate(order.createdAt)
    };
    const docRef = await addDoc(ordersRef, orderToSave);
    return docRef.id;
  }
}
