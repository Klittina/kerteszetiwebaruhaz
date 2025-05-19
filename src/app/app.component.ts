import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Auth, onAuthStateChanged, signOut, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
   imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user && user.email) {
        this.isLoggedIn = true;
        await this.loadUserRole(user.email);
      } else {
        this.isLoggedIn = false;
        this.userRole = null;
        this.cdr.detectChanges();
      }
    });
  }

  private async loadUserRole(email: string) {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const data = userDoc.data();
      this.userRole = data['role'] || null;
      console.log('Bejelentkezett user szerepkör:', this.userRole);
    } else {
      this.userRole = null;
      console.log('User nem található a Firestore-ban.');
    }

    this.cdr.detectChanges();
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.isLoggedIn = false;
      this.userRole = null;
      this.cdr.detectChanges();
      window.location.href = '/home';
    });
  }

onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
