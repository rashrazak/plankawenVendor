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

    async addService(collectionType, colllectionObject){

        collectionType = 'photographer'
        if (collectionType == 'photographer') {
            let data = {
                name:'batavia photographer',
                created: new Date(),
                slug: data.name.replace(/ +/g, "") + new Date().getTime(),
                getTime: new Date().getTime,
                location:{
                    lat:'123123123',
                    lng:'123123123',
                    city:'kajang',
                    address:'asdassdasdasd'
                },
                areaCovered:['kajang','serdang','sepang'],
                jenisEvent:['nikah','walimah','outdoor'],
                totalEvent:data.jenisEvent.length,
                vendorId:'',
                status:'pending',
                harga:140,
                description:'lorem ipsum blalalalala'

            }
        }else if(collectionType == 'videographer'){
            let data = {
                name:'batavia videographer',
                created: new Date(),
                slug: data.name.replace(/ +/g, "") + new Date().getTime(),
                getTime: new Date().getTime,
                location:{
                    lat:'123123123',
                    lng:'123123123',
                    city:'kajang',
                    address:'asdassdasdasd'
                },
                areaCovered:['kajang','serdang','sepang'],
                jenisEvent:['nikah','walimah','outdoor'],
                totalEvent:data.jenisEvent.length,
                vendorId:'',
                status:'pending',
                harga:140,
                description:'lorem ipsum blalalalala'

            }
        }else if(collectionType == 'caterer'){
            let data = {
                name:'batavia caterer',
                created: new Date(),
                slug: data.name.replace(/ +/g, "") + new Date().getTime(),
                getTime: new Date().getTime,
                location:{
                    lat:'123123123',
                    lng:'123123123',
                    city:'kajang',
                    address:'asdassdasdasd'
                },
                areaCovered:['kajang','serdang','sepang'],
                vendorId:'',
                status:'pending',
                hargaPerPerson:6,
                discount:[{
                    min:1,
                    max:1000,
                    discount: 0.10 //10 %
                },
                {
                    min:1001,
                    max:2000,
                    discount: 0.20 //20 %
                }],
                senaraiLauk:['nasik','ayam masak merah', 'kuah dal'],
                description:'lorem ipsum blalalalala'
            }
        }else if(collectionType == 'door gift'){
            let data = {
                name:'batavia door gift',
                created: new Date(),
                slug: data.name.replace(/ +/g, "") + new Date().getTime(),
                getTime: new Date().getTime,
                location:{
                    lat:'123123123',
                    lng:'123123123',
                    city:'kajang',
                    address:'asdassdasdasd'
                },
                areaCovered:['kajang','serdang','sepang'],
                vendorId:'',
                status:'pending',
                hargaPerPerson:0.3,
                discount:[{
                    min:1,
                    max:1000,
                    discount: 0.10 //10 %
                },
                {
                    min:1001,
                    max:2000,
                    discount: 0.20 //20 %
                }],
                description:'lorem ipsum blalalalala'
            }
        }else if(collectionType == 'kad kahwin dan banner'){
            let data = {
                name:'batavia door gift',
                created: new Date(),
                slug: data.name.replace(/ +/g, "") + new Date().getTime(),
                getTime: new Date().getTime,
                location:{
                    lat:'123123123',
                    lng:'123123123',
                    city:'kajang',
                    address:'asdassdasdasd'
                },
                areaCovered:['kajang','serdang','sepang'],
                vendorId:'',
                status:'pending',
                hargaPerPerson:0.3,
                discount:[{
                    min:1,
                    max:1000,
                    discount: 0.10 //10 %
                },
                {
                    min:1001,
                    max:2000,
                    discount: 0.20 //20 %
                }],
                description:'lorem ipsum blalalalala',
                banner:true, //false banner description null
                bannerDesc:{
                    bannerSize:[
                        {
                            size:'100 x 300 cm',
                            harga:200,
                        },
                        {
                            size:'200 x 400 cm',
                            harga:400,
                        }
                    ],
                    description:'loren ipsum avadasd'
                }
            }
        }else if(collectionType == 'pelamin'){
            let data = {
                name:'batavia boutique',
                created: new Date(),
                slug: data.name.replace(/ +/g, "") + new Date().getTime(),
                getTime: new Date().getTime,
                location:{
                    lat:'123123123',
                    lng:'123123123',
                    city:'kajang',
                    address:'asdassdasdasd'
                },
                areaCovered:['kajang','serdang','sepang'],
                vendorId:'',
                status:'pending',
                jenisEvent:['nikah','walimah','outdoor'],
                totalEvent:data.jenisEvent.length,
                description:'lorem ipsum blalalalala',
            }
        }
        return await this.db.collection(collectionType).add(colllectionObject)
    }

    
}



export default new Firebase();