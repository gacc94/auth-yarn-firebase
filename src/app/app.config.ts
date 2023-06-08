import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {connectFirestoreEmulator, Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {Auth, connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {provideAnimations} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkoOMhxux5vPznOtgVTT7bXl-Y3uN2Z9E",
    authDomain: "auth-firebase-angular-e54c1.firebaseapp.com",
    projectId: "auth-firebase-angular-e54c1",
    storageBucket: "auth-firebase-angular-e54c1.appspot.com",
    messagingSenderId: "139005490875",
    appId: "1:139005490875:web:da7238e9a09c2d925cdb9e"
};


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(firebaseConfig)),
            provideAuth(() => {
                const auth: Auth = getAuth();
                // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
                return auth;
            }),
            provideFirestore(() => {
                const firestore: Firestore = getFirestore();
                // connectFirestoreEmulator(firestore, 'http://localhost', 9098);
                return getFirestore();
            }),
            MatSnackBarModule,
        ),
        provideAnimations(),
    ]
};
