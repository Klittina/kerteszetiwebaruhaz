import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "egycserepes",
        appId: "1:295949928461:web:0297fd899c97a3434d2d44",
        storageBucket: "egycserepes.firebasestorage.app",
        apiKey: "AIzaSyCbOZzI_2XxNVmuA4f7vb5a0lv3aKVscow",
        authDomain: "egycserepes.firebaseapp.com",
        messagingSenderId: "295949928461" })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())]
};
