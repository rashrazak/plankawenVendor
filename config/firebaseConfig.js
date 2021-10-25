import Swal from 'sweetalert2'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, updatePassword  } from 'firebase/auth';
import { getFirestore,  collection, getDocs, query, where, addDoc, doc, updateDoc, setDoc, deleteDoc  } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadString, getDownloadURL   } from "firebase/storage";
import * as ls from 'local-storage'
import emailjs from 'emailjs-com';


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

const app = initializeApp({...config});


// import sendEmail, {adminEmail} from './emailConfig'


class Firebase {
    constructor(){
        this.auth = getAuth(app);
        this.db = getFirestore(app);
        this.storage = getStorage(app);
    }

    async check(email){
        // return await this.db.collection('vendor').where('email', '==', email).get()
        return await getDocs(query(collection(this.db, "vendor"), where("email", "==", email)))
        //dah
    }

    async signIn(email, password){
        return await signInWithEmailAndPassword(this.auth, email, password)
        //dah
    }

    signOut(){
        return signOut(this.auth);
        //dah
    }

    isInitialized(){
        return new Promise( resolve => {
            onAuthStateChanged(this.auth, resolve);
        })
        //dah
    }

    currentUser(){
        return this.auth.currentUser;
        //dah
    }

    async getImagesService(images, serviceType, email){
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
                // var locRef     = storageRef.child(`service/${email}/${serviceType}/${x.name}`)
                var locRef = ref(this.storage, `service/${email}/${serviceType}/${x.name}`)


                // var locResult = locRef.putString(base, 'data_url');
    
                uploadString(locRef, base, 'data_url').then(snapshot =>{
                    getDownloadURL(locRef).then(async(downloadURL)=>{
                        let param = {
                            urlStorage:downloadURL
                        }
                        newImg.push(param);
                    })
                }).catch(err =>{
                    console.log(err)
                })
                // await locResult.on('state_changed',snapshot=>{
    
                // },(error)=>{
                //     console.log(error)
                // },async ()=>{
                //     await locResult.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //         let param = {
                //             urlStorage:downloadURL
                //         }
                //         newImg.push(param);
                //     })
                // })    
            }
        })
        console.log(newImg);

        return newImg
    }

    async getImagesPackage(images, email){
        // var storageRef = ref(this.storage);
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
                // var locRef     = storageRef.child(`package/${email}/${x.name}`)
                var locRef = ref(this.storage, `package/${email}/${x.name}`)
                // var locResult = locRef.putString(base, 'data_url');

                uploadString(locRef, base, 'data_url').then(snapshot =>{
                    getDownloadURL(locRef).then(async(downloadURL)=>{
                        let param = {
                            urlStorage:downloadURL
                        }
                        newImg.push(param);
                    })
                }).catch(err =>{
                    console.log(err)
                })
    
                // await locResult.on('state_changed',snapshot=>{
    
                // },(error)=>{
                //     console.log(error)
                // },async ()=>{
                //     await locResult.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //         let param = {
                //             urlStorage:downloadURL
                //         }
                //         newImg.push(param);
                //     })
                // })    
            }
        })
        console.log(newImg);

        return newImg
    }

    async addService(serviceType, data){
        // return await this.db.collection(serviceType).add(data)
        return await addDoc(collection(this.db, serviceType),data)
    }
  
    async updateService(serviceType, data, serviceId){
        // return await this.db.collection(serviceType).doc(serviceId).set(data)
        const refData = doc(this.db, serviceType, serviceId);
        return await setDoc(refData, data)
    }
    
    //pending patot ada status = approved
    async checkServiceType(serviceType, email){
        // return await this.db.collection(serviceType).where('email', '==', email).get() 
        return await getDocs(query(collection(this.db, serviceType), where("email", "==", email)))
    }
    //pending patot ada status = approved
    async checkPackageType(email){
        // return await this.db.collection('package').where('email', '==', email).get() 
        return await getDocs(query(collection(this.db, 'package'), where("email", "==", email)))

        
    }

    async getPackageById(id){
        // return await this.db.collection('package').doc(id).get() 
        const docRef = doc(this.db, 'package', id);
        return await getDoc(docRef);
    }

    async deleting(serviceType, id){
        // await this.db.collection(serviceType).doc(id).delete();
        await deleteDoc(doc(this.db, serviceType, id));
        ls.remove('serviceList')
        location.reload();
    }

    async deletingPackage(id){
        // await this.db.collection('package').doc(id).delete();
        await deleteDoc(doc(this.db, 'package', id));
        location.reload();
    }

    async verification(){
        // var user = app.auth().currentUser;
        var user = this.auth.currentUser;
        sendEmailVerification(user).then(function() {
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
        // const check = await app.firestore().collection('vendor').where('email', '==', companyEmail).get()
        const check = await getDocs(query(collection(this.db, "vendor"), where("email", "==", companyEmail)))
        let result = check.docs
        
        
        if (result.length > 0) {
            alert('Account Exist! ')
            return false;
        }
        
       
        if (ssmImage) {
            let img     = ssmImage;
            let base    = img.base64;
            
            
            // var locRef     = storageRef.child(`vendor/${companyEmail}/ssmImage.jpg`)
            var locRef = ref(this.storage, `vendor/${companyEmail}/ssmImage.jpg`)

            // var locResult = locRef.putString(base, 'data_url');
            uploadString(locRef, base, 'data_url').then(snapshot =>{
                getDownloadURL(locRef).then(async(downloadURL)=>{
                    param.ssmImage = downloadURL;
                    await createUserWithEmailAndPassword(this.auth, companyEmail, password).then( async ()=>{
                        await addDoc(collection(this.db, 'vendor'),param)
                        Swal.close()
                        var user = this.auth.currentUser
                        sendEmailVerification(user).then(function() {
                            // Email sent.
                            alert('Registered! please check email for verification.')
                            ls.clear()
                            window.location.href = '/'

                        }).catch(function(error) {
                        // An error happened.
                        });

                    }).catch((err)=>{
                        Swal.close()
                        alert(err)
                    })
                })
            }).catch(err =>{
                console.log(err)
            })
            // await locResult.on('state_changed',snapshot=>{

            // },(error)=>{
            //     console.log(error)
            // },()=>{
            //     locResult.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
            //         param.ssmImage = downloadURL;
            //         console.log(downloadURL)
            //         await app.auth().createUserWithEmailAndPassword(companyEmail, password).then( async ()=>{
            //             await app.firestore().collection('vendor').add(param)
            //             Swal.close()
            //             // var user = app.auth().currentUser;
            //             var user = this.auth.currentUser

            //             // sendEmail({
            //             //     email:companyEmail,
            //             //     type: 'vendor-created-admin'
            //             // })
                        
            //             // let sendMailData = {
            //             //     vendor_email:email,
            //             //     package_title:title,
            //             //   }
            //             // emailjs.send('service_aaq80og','template_k0aiiyu', sendMailData)
            //             user.sendEmailVerification().then(function() {
            //                 // Email sent.
            //                 alert('Registered! please check email for verification.')
            //                 window.location.href = '/'

            //             }).catch(function(error) {
            //             // An error happened.
            //             });
            //         }).catch((err)=>{
            //             Swal.close()
            //             alert(err)
            //         })
                    
            
                    
            //     })
            // })
            return true;
        }

    }


    async updateVendor(param, password, companyEmail, ssmImage, vendorId){
        param.dateUpdated = new Date(); 
        console.log(ssmImage)
        if (ssmImage) {

            if (password) {
                // var user = app.auth().currentUser;
                var user = this.auth.currentUser;
                updatePassword(user, password);
            }
            let img     = ssmImage;
            let base    = img.base64;

            if (img.base64 != undefined) {
                if (param.ssmImage.length > 5) {
                    // var desertRef = storageRef.child(`vendor/${companyEmail}/ssmImage.jpg`);
                    var desertRef = ref(this.storage, `vendor/${companyEmail}/ssmImage.jpg`)

                    // Delete the file
                    deleteObject(desertRef)
                    // desertRef.delete();
                }

                
                
                
                // var locRef     = storageRef.child(`vendor/${companyEmail}/ssmImage.jpg`)
                var locRef = ref(this.storage, `vendor/${companyEmail}/ssmImage.jpg`)

                // var locResult = locRef.putString(base, 'data_url');
                uploadString(locRef, base, 'data_url').then(snapshot =>{
                    getDownloadURL(locRef).then(async(downloadURL)=>{
                        param.ssmImage = downloadURL;
                        const refData = doc(this.db, 'vendor', vendorId);
                        await updateDoc(refData, param)
                        return true;
                    })
                }).catch(err =>{
                    console.log(err)
                })

                // await locResult.on('state_changed',snapshot=>{

                // },(error)=>{
                //     console.log(error)
                // },()=>{
                //     locResult.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
                //         param.ssmImage = downloadURL;
                //         console.log(downloadURL)
                //         await app.firestore().collection('vendor').doc(vendorId).update(param)
                //         return true;
                //     })
                // }) 
            }else{
                param.ssmImage = ssmImage
                // await app.firestore().collection('vendor').doc(vendorId).update(param)
                const refData = doc(this.db, 'vendor', vendorId);
                await updateDoc(refData, param)
            }
            Swal.close()
            alert('Updated!')
            window.location.href = '/'

        }
       

    }

    async updateVendorProfileImage(image, companyEmail, vendorId){
        if (image) {
            
            let img     = image;

            if (img != undefined) {
                // var desertRef = storageRef.child(`vendor/${companyEmail}/userImage.jpg`);
                // desertRef.delete();
                
                // var locRef      = storageRef.child(`vendor/${companyEmail}/userImage.jpg`)
                var locRef = ref(this.storage, `vendor/${companyEmail}/userImage.jpg`)

                // var locResult   = locRef.putString(img, 'data_url');
                uploadString(locResult, img, 'data_url').then(snapshot =>{
                    getDownloadURL(locRef).then(async(downloadURL)=>{
                        const refData = doc(this.db, 'vendor', vendorId);
                        await updateDoc(refData, {
                            profileImage:downloadURL
                        }).catch(err=> console.log(err))
                        Swal.close()
                        alert('Updated!')
                        window.location.href = '/'
                        return true;
                    })
                }).catch(err =>{
                    console.log(err)
                })
                // await locResult.on('state_changed',snapshot=>{

                // },(error)=>{
                //     console.log(error)
                // },()=>{
                //     locResult.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
                //         console.log(downloadURL)
                //         await app.firestore().collection('vendor').doc(vendorId).update({
                //             profileImage:downloadURL
                //         }).then(()=>{
                            
                //         }).catch(err=> console.log(err))
                //         Swal.close()
                //         alert('Updated!')
                //         window.location.href = '/'
                //         return true;
                //     })
                // }) 
            }
            

        }
       

    }

    async updateVendorCompanyDesc(companyDesc, vendorId){
        if (companyDesc) {
            const refData = doc(this.db, 'vendor', vendorId);
            await updateDoc(refData, {
                companyDesc
            }).then(()=>{
                Swal.close()
                alert('Updated!')
                window.location.href = '/'
                return true;         
            }).catch(err=> console.log(err))
           
            // app.firestore().collection('vendor').doc(vendorId).update({
            //     companyDesc
            // }).then(()=>{
            //     Swal.close()
            //     alert('Updated!')
            //     window.location.href = '/'
            //     return true;         
            // }).catch(err=> console.log(err))
        }
    }

    async getVendorUser(email){
        // return await this.db.collection('vendor').where('email', '==', email).get()
        return await getDocs(query(collection(this.db, 'vendor'), where("email", "==", email)))
        
    }

    async getPackages(email){
        // return await this.db.collection('package').where('email', '==', email).get()
        return await getDocs(query(collection(this.db, 'package'), where("email", "==", email)))

    }

    async createPackage(data){
        // return await this.db.collection('package').add(data)
        return await addDoc(collection(this.db, "package"), data);
    }

    async updatePackage(id, data){
        // return await this.db.collection('package').doc(id).update(data)
        const refData = doc(this.db, 'package', id);
        return await updateDoc(refData, data)
    }
    
}



export default new Firebase();