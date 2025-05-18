import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../../shared/models/User';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);

  firebaseUser: FirebaseUser | null = null;
  profileForm!: FormGroup;
  editMode = false;
  loading = true;
userDocId: string | null = null;

  constructor() {}

  ngOnInit() {
    user(this.auth).subscribe(async (firebaseUser) => {
      this.firebaseUser = firebaseUser;
      console.log('Betöltéshez használt uid:', this.firebaseUser?.uid);

      if (this.firebaseUser) {
        await this.loadUserData();
      } else {
        console.warn('Nincs bejelentkezett felhasználó.');
        this.loading = false;
      }
    });
  }


private async loadUserData() {
  if (!this.firebaseUser?.email) {
    console.warn('Nincs e-mail cím a firebaseUser-ben.');
    this.loading = false;
    return;
  }

  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where('email', '==', this.firebaseUser.email));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    this.userDocId = docSnap.id;
    const data = docSnap.data() as User;

    this.profileForm = this.fb.group({
      firstname: [data.name?.firstname || '', Validators.required],
      lastname: [data.name?.lastname || '', Validators.required],
      email: [data.email || '', [Validators.required, Validators.email]]
    });
  } else {
    console.warn('A felhasználói adat nem található email alapján.');
  }

  this.loading = false;
}

  async saveChanges() {
  if (this.profileForm.valid && this.userDocId) {
    const { firstname, lastname, email } = this.profileForm.value;
    const userRef = doc(this.firestore, `users/${this.userDocId}`);

    await updateDoc(userRef, {
      name: { firstname, lastname },
      email: email
    });

    this.editMode = false;
    this.loading = true;
    await this.loadUserData(); // újratöltés a mentés után
  }
}

}
