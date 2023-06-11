import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {connectFirestoreEmulator, Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {Auth, connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {provideAnimations} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "@core/interceptors/token.interceptor";
import {TokenIntInterceptor} from "@core/interceptors/token-int.interceptor";
import {environment} from "@environments/environment";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(environment.firebase)),
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
        provideHttpClient(
            withInterceptors([tokenInterceptor]),
        ),
        {
            provide: HTTP_INTERCEPTORS, useClass: TokenIntInterceptor, multi: true
        }
    ]
};
