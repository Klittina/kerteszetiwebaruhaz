import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { Product } from '../../shared/models/Products';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth , createUserWithEmailAndPassword,UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  adminForm: FormGroup;
  productForm: FormGroup;
  imagePreview: string | null = null;

  categories: string[] = [
    'Palánta',
    'Vetőmag',
    'Cserepes növény',
    'Gyümölcsfa csemete',
    'Évelő növény',
    'Egynyári virág',
    'Szobanövény',
    'Fűmag',
    'Trágya és komposzt',
    'Föld és talajjavító',
    'Permetszer és növényvédelem',
    'Bio kertészeti termék',
    'Kerti kéziszerszám',
    'Kerti gép',
    'Öntözéstechnika',
    'Kaspó és virágtartó',
    'Kerti dekoráció',
    'Kerti bútor',
    'Üvegház és fóliasátor',
    'Mulcs és fakéreg'
  ];

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private auth: Auth

  ) {
    this.adminForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: [null, Validators.required]
    });
  }

  private currentUserEmail: string | null = null;
  private currentUserPassword: string | null = null;

async addAdmin() {
  if (this.adminForm.valid) {
    const { firstname, lastname, email, password } = this.adminForm.value;

    const currentUser = this.auth.currentUser;
    if (!currentUser || !currentUser.email) {
      alert('Nem vagy bejelentkezve!');
      return;
    }
    this.currentUserEmail = currentUser.email;

    try {
      await createUserWithEmailAndPassword(this.auth, email, password);

      const userRef = collection(this.firestore, 'users');
      await addDoc(userRef, {
        id: Date.now(),
        name: { firstname, lastname },
        email,
        role: 'a'
      });

      alert('Új admin sikeresen hozzáadva.');

      const currentPassword = prompt('Add meg az eredeti jelszavad, hogy újra be tudj jelentkezni:');
      if (currentPassword) {
        try {
          await signInWithEmailAndPassword(this.auth, this.currentUserEmail!, currentPassword);
          alert('Visszajelentkeztél az eredeti felhasználóval.');
        } catch (error) {
          alert('Nem sikerült visszajelentkezni: ' + (error as Error).message);
        }
      } else {
        alert('Nem adtad meg a jelszót, így nem tudtál visszajelentkezni.');
      }
    } catch (error) {
      console.error(error);
      alert('Hiba történt az admin létrehozásakor.');
    }

    this.adminForm.reset();
  }
}


  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async addProduct() {
    if (this.productForm.valid) {
      const { name, category, price, stock, image } = this.productForm.value;

      // TODO: Replace this with real image uploading logic (e.g. Firebase Storage)
      const imageUrl = this.imagePreview ?? '';

      const productRef = collection(this.firestore, 'products');
      await addDoc(productRef, {
        id: Date.now(),
        name,
        category,
        price,
        stock,
        imageUrl
      });

      this.productForm.reset();
      this.imagePreview = null;
      alert('Termék sikeresen hozzáadva.');
    }
  }
}
