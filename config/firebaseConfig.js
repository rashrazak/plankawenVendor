import * as app from 'firebase/app';
import Swal from 'sweetalert2'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

//test
// const config = {
//     apiKey: "AIzaSyC_0QtkXQApYKK101apDFYf6pn7LNAWItg",
//     authDomain: "plankawen-61a3a.firebaseapp.com",
//     databaseURL: "https://plankawen-61a3a.firebaseio.com",
//     projectId: "plankawen-61a3a",
//     storageBucket: "plankawen-61a3a.appspot.com",
//     messagingSenderId: "745867454643",
//     appId: "1:745867454643:web:a3e3cfba41ea05de"
//   }
//production
const config = {
    apiKey: "AIzaSyDJwYfTFCcAG71iHs6pqxIyBJaBRa-qOH8",
    authDomain: "plankawen-19918.firebaseapp.com",
    databaseURL: "https://plankawen-19918.firebaseio.com",
    projectId: "plankawen-19918",
    storageBucket: "plankawen-19918.appspot.com",
    messagingSenderId: "79976166898",
    appId: "1:79976166898:web:b6fa8275211bf940b9a76b",
    measurementId: "G-3ZEDEV7BH1"
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

    async getImagesPackage(images, email){
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
                var locRef     = storageRef.child(`package/${email}/${x.name}`)
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

    async getPackageById(id){
        return await this.db.collection('package').doc(id).get() 
    }

    async deleting(serviceType, id){
        await this.db.collection(serviceType).doc(id).delete();
        location.reload();
    }

    async deletingPackage(id){
        await this.db.collection('package').doc(id).delete();
        location.reload();
    }

    async verification(){
        var user = app.auth().currentUser;
        user.sendEmailVerification().then(function() {
            // Email sent.
            alert('Sent! please check email for verification.')
        }).catch(function(error) {
            console.log(error)
        });
    }


    async createVendor(param, password, companyEmail, ssmImage){
        param.dateCreated = new Date();
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
                locResult.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
                    param.ssmImage = downloadURL;
                    console.log(downloadURL)
                    await app.auth().createUserWithEmailAndPassword(companyEmail, password).then( async ()=>{
                        await app.firestore().collection('vendor').add(param)
                        Swal.close()
                        var user = app.auth().currentUser;

                        user.sendEmailVerification().then(function() {
                        // Email sent.
                        alert('Registered! please check email for verification.')

                        window.location.href = '/'

                        }).catch(function(error) {
                        // An error happened.
                        });
                    }).catch((err)=>{
                        Swal.close()
                        alert(err)
                    })
                    
            
                    
                })
            })
            return true;
        }

    }


    async updateVendor(param, password, companyEmail, ssmImage, vendorId){
        param.dateUpdated = new Date(); 
        if (ssmImage) {

            if (password) {
                var user = app.auth().currentUser;
                user.updatePassword(password);
            }
            var storageRef = this.storage.ref();
            let img     = ssmImage;
            let base    = img.base64;

            if (img.base64 != undefined) {
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
                        await app.firestore().collection('vendor').doc(vendorId).update(param)
                        return true;
                    })
                }) 
            }else{
                param.ssmImage = ssmImage
                await app.firestore().collection('vendor').doc(vendorId).update(param)
            }
            Swal.close()
            alert('Updated!')
            window.location.href = '/'

        }
       

    }

    async updateVendorProfileImage(image, companyEmail, vendorId){
        if (image) {
            
            var storageRef = this.storage.ref();
            let img     = image;

            if (img != undefined) {
                // var desertRef = storageRef.child(`vendor/${companyEmail}/userImage.jpg`);
                // desertRef.delete();
                
                var locRef      = storageRef.child(`vendor/${companyEmail}/userImage.jpg`)
                var locResult   = locRef.putString(img, 'data_url');
                await locResult.on('state_changed',snapshot=>{

                },(error)=>{
                    console.log(error)
                },()=>{
                    locResult.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
                        console.log(downloadURL)
                        await app.firestore().collection('vendor').doc(vendorId).update({
                            profileImage:downloadURL
                        }).then(()=>{
                            
                        }).catch(err=> console.log(err))
                        Swal.close()
                        alert('Updated!')
                        window.location.href = '/'
                        return true;
                    })
                }) 
            }
            

        }
       

    }

    updateVendorCompanyDesc(companyDesc, vendorId){
        if (companyDesc) {
            app.firestore().collection('vendor').doc(vendorId).update({
                companyDesc
            }).then(()=>{
                Swal.close()
                alert('Updated!')
                window.location.href = '/'
                return true;         
            }).catch(err=> console.log(err))
        }
    }

    async getVendorUser(email){
        return await this.db.collection('vendor').where('email', '==', email).get()
    }

    async getPackages(email){
        return await this.db.collection('package').where('email', '==', email).get()
    }

    async createPackage(data){
        return await this.db.collection('package').add(data)
    }

    async updatePackage(id, data){
        return await this.db.collection('package').doc(id).update(data)
    }
    
}



export default new Firebase();