import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {connectFirestoreEmulator, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {environment} from "../environments/environment";
import {connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
            provideAuth( () => {
                const auth = getAuth();
                connectAuthEmulator(auth, 'http://localhost/9099',{disableWarnings: true})
                return auth;
            } ),
            provideFirestore(() => {
                const firestore = getFirestore();
                connectFirestoreEmulator(firestore, 'http://localhost', 9098)
                return getFirestore()
            }),

        )
    ]
};
