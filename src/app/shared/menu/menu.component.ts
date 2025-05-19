import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Auth, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  userRole: string | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user: FirebaseUser | null) => {
      if (user?.email) {
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();
          this.userRole = data['role'] || null;
        }
      }
    });
  }

  closeMenu(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.logoutEvent.emit();
    this.closeMenu();
    window.location.href = '/home';
  }

  ngOnDestroy(): void {
    // ha lenne subscription, itt törölnénk
  }
}
