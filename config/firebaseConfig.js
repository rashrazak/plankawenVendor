import * as app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
// const config = {
//     apiKey: process.env.REACT_APP_FIREBASE_KEY ,
//     authDomain: process.env.REACT_APP_FIREBASE_DOMAIN ,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE ,
//     projectId: process.env.REACTS_APP_FIREBASE_PROJECT_ID ,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID 
// }

const config = {
    apiKey: "AIzaSyC_0QtkXQApYKK101apDFYf6pn7LNAWItg",
    authDomain: "plankawen-61a3a.firebaseapp.com",
    databaseURL: "https://plankawen-61a3a.firebaseio.com",
    projectId: "plankawen-61a3a",
    storageBucket: "plankawen-61a3a.appspot.com",
    messagingSenderId: "745867454643",
    appId: "1:745867454643:web:a3e3cfba41ea05de"
  }

class Firebase {
    constructor(){
        !app.apps.length ? app.initializeApp(config) : app.app();
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async check(email){
        return await this.db.collection('vendor').where('email', '==', email).get()
    }

    async signIn(email, password){
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    signOut(){
        return this.auth.signOut();
    }

    isInitialized(){
        return new Promise( resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    currentUser(){
        return this.auth.currentUser;
    }

    addService(collectionType, colllectionObject){
        this.db.collection(collectionType).add(colllectionObject)
    }
}



export default new Firebase();