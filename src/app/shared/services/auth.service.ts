import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;
  private userData?: User;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    await this.fetchUserData(userCredential.user.uid);
    return userCredential;
  }

  async fetchUserData(uid: string): Promise<void> {
    const userDocRef = doc(this.firestore, 'Users', uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      this.userData = userSnapshot.data() as User;
    } else {
      console.error('Felhasználói adat nem található Firestore-ban.');
    }
  }

  getUserData(): User | undefined {
    return this.userData;
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    this.userData = undefined;
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  async signUp(email: string, password: string, userData: Omit<User, 'id' | 'email' | 'password'>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      const newUser: User = {
        ...userData,
        id: Date.now(), // Vagy használj saját ID-generáló logikát
        email,
        password, // nem javasolt így tárolni!
        role: 'u'
      };

      await this.createUserData(userCredential.user.uid, newUser);
      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: User): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);
    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}
