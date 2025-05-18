import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>  import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent:() => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent:() => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path:'profil',
    loadComponent:() =>import('./pages/profil/profil.component').then(m => m.ProfilComponent)
  },
  {
    path:'products',
    loadComponent:() =>import('./pages/products/products.component').then(m => m.ProductsComponent)
  },{
    path:'admin',
    loadComponent:() =>import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },{
    path:'cart',
    loadComponent:() =>import('./pages/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
