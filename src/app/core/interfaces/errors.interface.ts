import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;

export interface CustomFirebaseError extends FirebaseError {
    customData: {
        _tokenResponse: {
            error: {
                code: number
            }
        }
    }
}