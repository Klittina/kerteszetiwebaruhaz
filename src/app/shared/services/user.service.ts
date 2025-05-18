import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, where } from '@angular/fire/firestore';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));
    return collectionData(q, { idField: 'firestoreId' }) as Observable<User[]>;
  }

  getUserById(id: number): Observable<User | undefined> {
    const docRef = doc(this.firestore, 'users', id.toString());
    return docData(docRef) as Observable<User | undefined>;
  }
}
