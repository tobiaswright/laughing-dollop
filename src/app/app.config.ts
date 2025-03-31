import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({"projectId":"awarenesscolor-a7b0a","appId":"1:781705472503:web:641d6a13287f73328226f2","databaseURL":"https://awarenesscolor-a7b0a-default-rtdb.firebaseio.com","storageBucket":"awarenesscolor-a7b0a.firebasestorage.app","apiKey":"AIzaSyBlRAEeeMo6k-ChaVtMWsys8LeVBPZxAFU","authDomain":"awarenesscolor-a7b0a.firebaseapp.com","messagingSenderId":"781705472503"})),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),]
};
