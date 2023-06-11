import {inject, Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData, deleteDoc,
    doc,
    Firestore,
    getDocs,
    query,
    updateDoc,
    where
} from "@angular/fire/firestore";
import {IUser} from "../interfaces/users.interface";
import {from, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly firestore: Firestore = inject(Firestore);
    private readonly http:HttpClient = inject(HttpClient);

    addUser(user: IUser): Observable<any> {
        const userRef = collection(this.firestore, 'users');

        return from(addDoc(userRef, user));

    }

    getUsers(filter: string = ''): Observable<DocumentData[]> {
        const userRef = collection(this.firestore, 'users');
        let q = query(userRef);
        if (filter) {
            q = query(userRef, where('name', '==', filter));
        }
        return collectionData(q);
    }

    updateUser(user: IUser): Observable<any> {
        const userRef = collection(this.firestore, 'users');
        let q = query(userRef, where('id', '==', user.id))
        return from(getDocs(q)).pipe(
            map((documents) => {
                documents.forEach( (document)=> {
                    const docRef = doc(this.firestore, 'users', document.id)
                    from(updateDoc(docRef, {...user}));
                })
            })
        )
    }

    async deleteUser(id: string): Promise<void> {
        const userRef = collection(this.firestore, 'users');
        let q = query(userRef, where('id', '==', id));

        // const querySnapshot = await getDocs(q);
        //
        // querySnapshot.forEach( (document) => {
        //     const docRef = doc(this.firestore, 'users', document.id);
        //     deleteDoc(docRef);
        // })

        return await getDocs(q).then((res) => {
            res.forEach((document) => {
                deleteDoc(doc(this.firestore, 'users', document.id))
            })
        })
        // await deleteDoc(doc(this.firestore, 'users', id ))

        // return from(getDocs(q)).pipe(
        //     map((documents) => {
        //         documents.forEach( (document)=> {
        //             const docRef = doc(this.firestore, 'users', document.id)
        //            from(deleteDoc(docRef));
        //         })
        //     })
        // )

    }

    example() {
        return this.http.post('', {withCredentials: true}, {})
    }

}
