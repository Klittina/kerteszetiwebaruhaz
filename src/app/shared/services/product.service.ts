import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
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

  deleteProduct(productId: number): Promise<void> {
  const docRef = doc(this.firestore, 'products', productId.toString());
  return deleteDoc(docRef);
}


  async decreaseStock(productId: string, quantity: number) {
  const productRef = doc(this.firestore, 'products', productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    const productData = productSnap.data() as Product;
    const newStock = (productData.stock || 0) - quantity;
    if (newStock < 0) throw new Error(`Nincs elég készlet a termékből: ${productData.name}`);

    await updateDoc(productRef, { stock: newStock });
  } else {
    throw new Error('Termék nem található');
  }
}
}
