import * as app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
        this.storage = app.storage();
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

    async getImagesService(images, serviceType, email){
        var storageRef = this.storage.ref();
        var newImg = [];
        await images.map(async (x,i)=> {
            var img     = x;
            if (img.urlStorage) {
                let param = {
                    urlStorage:img.urlStorage
                }
                newImg.push(param);
            }else{
                var base    = img.base64;
                var locRef     = storageRef.child(`service/${email}/${serviceType}/${x.name}`)
                var locResult = locRef.putString(base, 'data_url');
    
                await locResult.on('state_changed',snapshot=>{
    
                },(error)=>{
                    console.log(error)
                },async ()=>{
                    await locResult.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        let param = {
                            urlStorage:downloadURL
                        }
                        newImg.push(param);
                    })
                })    
            }
        })
        console.log(newImg);

        return newImg
    }

    async addService(serviceType, data){
        return await this.db.collection(serviceType).add(data)
    }
  

    async updateService(serviceType, data, serviceId){
        return await this.db.collection(serviceType).doc(serviceId).set(data)
    }
    //pending patot ada status = approved
    async checkServiceType(serviceType, email){
        return await this.db.collection(serviceType).where('email', '==', email).get() 
    }

    async deleting(serviceType, id){
        await this.db.collection(serviceType).doc(id).delete();
        location.reload();
    }


    async createVendor(param, password, companyEmail, ssmImage){

        if (password.length < 6) {
            alert('Your password need more than 6 characters')
            return false;
        }
        const check = await app.firestore().collection('vendor').where('email', '==', companyEmail).get()
        let result = check.docs
        
        
        if (result.length > 0) {
            alert('Account Exist! ')
            return false;
        }
        this.db.collection('vendor').add(param)
        this.auth.createUserWithEmailAndPassword(companyEmail, password)
       
        if (ssmImage) {
            var storageRef = this.storage.ref();
            let img     = ssmImage;
            let base    = img.base64;
            
            
            var locRef     = storageRef.child(`vendor/${companyEmail}/ssmImage.jpg`)
            var locResult = locRef.putString(base, 'data_url');
            await locResult.on('state_changed',snapshot=>{

            },(error)=>{
                console.log(error)
            },()=>{
                locResult.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    param.ssmImage = downloadURL;
                    console.log(downloadURL)
                    
            
                    
                })
            })

        }

        return true;
    }


    async updateVendor(param, password, companyEmail, ssmImage, vendorId){
        if (ssmImage) {

            if (password) {
                var user = firebase.auth().currentUser;
                user.updatePassword(password);
            }
            var storageRef = this.storage.ref();
            let img     = ssmImage;
            let base    = img.base64;

            if (param.ssmImage.length > 5) {
                var desertRef = storageRef.child(`vendor/${companyEmail}/ssmImage.jpg`);
                // Delete the file
                desertRef.delete();
            }

            
            
            
            var locRef     = storageRef.child(`vendor/${companyEmail}/ssmImage.jpg`)
            var locResult = locRef.putString(base, 'data_url');
            await locResult.on('state_changed',snapshot=>{

            },(error)=>{
                console.log(error)
            },()=>{
                locResult.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
                    param.ssmImage = downloadURL;
                    console.log(downloadURL)
                    await app.firestore().collection('vendor').doc(vendorId).set(param)
                    return true;
                })
            })

            return true

        }
       

    }

    async getVendorUser(email){
        return await this.db.collection('vendor').where('email', '==', email).get()
    }

    
}



export default new Firebase();