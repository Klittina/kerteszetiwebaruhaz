import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service'; // új import
import { take } from 'rxjs';
import { User } from '../../shared/models/User';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth'; // importálni kell

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loadingSubscription?: Subscription;

  constructor(
  private auth: Auth, // Hozzá kell adni
  private router: Router,
  private loadingService: FakeLoadingService,
  private userService: UserService
) {}

async login() {
  const emailValue = this.email.value?.trim() || '';
  const passwordValue = this.password.value?.trim() || '';
  this.loginError = '';
  this.isLoading = true;
  this.showLoginForm = false;

  try {
    // ⬇️ Firebase bejelentkezés
    const result = await signInWithEmailAndPassword(this.auth, emailValue, passwordValue);

    // ⬇️ User betöltése és szerepkör lekérdezése Firestore-ból vagy máshonnan
    const user = result.user;

    console.log("Sikeres Firebase login:", user.email);

    localStorage.setItem('userEmail', user.email || '');  // <-- EZ KELL

    // Most már AppComponent is érzékeli majd!
    this.router.navigateByUrl('/home');

  } catch (error) {
    console.error(error);
    this.loginError = 'Hibás email vagy jelszó!';
    this.isLoading = false;
    this.showLoginForm = true;
  }
}

  login2() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';


    this.loadingService.loadingWithPromise2(emailValue, passwordValue).then((_: boolean) => {
      console.log("This executed second!");
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/home');
    }).catch(error => {
      this.isLoading = false;
      this.showLoginForm = true;
      this.loginError = 'Invalid email or password!';
      console.error(error);
    }).finally(() => {
      console.log("This executed finally!");
    });

    console.log("This executed first!");
  }

  async login3() {
  const emailValue = this.email.value || '';
  const passwordValue = this.password.value || '';

  try {
    const user: User = await this.loadingService.loadingWithPromise3(emailValue, passwordValue);

    this.isLoading = true;
    this.showLoginForm = false;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', user.role);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('isLoggedIn', 'true');

    if (user.role === 'a') {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/home');
    }

  } catch (error) {
    console.error(error);
    this.loginError = 'Bejelentkezési hiba!';
    this.isLoading = false;
    this.showLoginForm = true;
  }

  console.log("This executed finally!");
}


  login4() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    this.loadingSubscription = this.loadingService.loadingWithObservable2(emailValue, passwordValue).subscribe((data: boolean)=>{
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe;
  }
}
