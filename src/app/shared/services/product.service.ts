import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Product } from '../models/Products';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData, query, where, orderBy, limit } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'products');
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductsFiltered(category?: string, minPrice?: number, maxPrice?: number): Observable<Product[]> {
    const constraints = [];

    if (category) {
      constraints.push(where('category', '==', category));
    }
    if (minPrice !== undefined) {
      constraints.push(where('price', '>=', minPrice));
    }
    if (maxPrice !== undefined) {
      constraints.push(where('price', '<=', maxPrice));
    }

    constraints.push(orderBy('price', 'asc'));
    constraints.push(limit(20));

    const q = query(this.productCollection, ...constraints);

    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }
}
