import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {IUser} from "../interfaces/users.interface";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly firestore: Firestore = inject(Firestore);

    addUser(user: IUser): Observable<any> {
        const userRef = collection(this.firestore, 'users');
        return from(addDoc(userRef, user));

    }

    getUsers(filter: string = '') {
        const userRef = collection(this.firestore, 'users');
        let q = query(userRef);
        if (filter) {
            q = query(userRef, where('name', '==', filter));
        }
        return collectionData(q);

    }

}
