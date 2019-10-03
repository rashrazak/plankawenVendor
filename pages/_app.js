import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import LoginContext from '../contexts/LoginContext';
import firebase from '../config/firebaseConfig';
import AddServiceContext from '../contexts/AddServiceContext'
/*
  hargaPerPerson,discount // addServiceDetailsKadBanner/addServiceDetailsCaterer/addServiceDetailsDoorGift/addServiceDetailsHantaran
  harga,hargaDiscount // addServiceDetailsVenue/addServiceDetailsWeddingDress
          /addServiceDetailsKugiran/addServiceDetailsPhotographer
          /addServiceDetailsVideographer/addServiceDetailsPelamin
  hargaTouchup,hargaDiscountTouchup
  hargaFull,hargaDiscountFull

  */
const initialState = {
  user: null,
  isLogin:false,
  vendorDetails:null,
  vendorId:'',
  addServiceAbout:{
    tnc:'',
    extra:'',
    serviceType:'',
    serviceName:'',
    description:'',
    areaCovered:[],
    status:'pending' //pending,active,inactive
  },
  addServiceDetailsVenue:{ // A
    harga:0,
    discount:0,
    hargaDiscount:0,
    lokasi:{
      address:'',
      lat:'',
      lng:'',
      state:'',
      city:''
    },
    alamatPenuh:'',
    waktuOperasi:''
  },
  addServiceDetailsWeddingDress:{ // A
    harga:0,
    discount:0,
    hargaDiscount:0,
    lokasi:{
      address:'',
      lat:'',
      lng:'',
      state:'',
      city:''
    },
    syaratSewaan:'',
    jenisSewa:[]
  },
  addServiceDetailsKugiran:{ // A
    harga:0,
    discount:0,
    hargaDiscount:0,
    lokasi:{
      address:'',
      lat:'',
      lng:'',
      state:'',
      city:''
    },
    waktuOperasi:''
  },
  addServiceDetailsPhotographer:{ // A
    harga:0,
    discount:0,
    hargaDiscount:0,
    jenisEvent:[]
  },
  addServiceDetailsVideographer:{ // A
    harga:0,
    discount:0,
    hargaDiscount:0,
    jenisEvent:[]
  
  },
  addServiceDetailsPelamin:{ // A
    harga:0,
    discount:0,
    hargaDiscount:0,
    jenisEvent:[]
  
  },
  addServiceDetailsMakeup:{ // C
    hargaTouchup:0,
    discountTouchup:0,
    hargaDiscountTouchup:0,
    hargaFull:0,
    discountFull:0,
    hargaDiscountFull:0,
    jenisMakeup:[],
    jantina:[]
  
  },
  addServiceDetailsKadBanner:{ // B
    hargaPerPerson:0,
    discount:[],
    banner:false,
    bannerDesc:{
      bannerSize:[],
      description:''
    }
  
  },
  addServiceDetailsCaterer:{ // B
    hargaPerPerson:0,
    discount:[],
    senaraiLauk:[]
  
  },
  addServiceDetailsDoorGift:{ // B
    hargaPerPerson:0,
    discount:[]
  
  },
  addServiceDetailsHantaran:{ // B
    hargaPerPerson:0,
    discount:[]
  
  },
  addServiceUpload:{
    serviceType:'',
    serviceId:'',
    vendorId:'',
    images:[] //max 3
  }
};

class MyApp extends App {

  constructor(props){
    super(props);
    this.state = initialState
  }
  
  
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  //FIREBASE USE WILL MOUNT
  componentDidMount = () => {
      let user = localStorage.getItem('user');
      user = JSON.parse(user)
      if (user == null){
        firebase.isInitialized().then(val => {
          if (val) {
            console.log(val)
            this.setState({
              user:{
                    name:val.displayName,
                    email:val.email,
                    photoUrl: val.photoURL,
                    emailVerified: val.emailVerified,
                    uid: val.uid
                },
              isLogin:true
            })
            localStorage.setItem('user', JSON.stringify({
              name:val.displayName,
              email:val.email,
              photoUrl: val.photoURL,
              emailVerified: val.emailVerified,
              uid: val.uid
            }))
            
            if ( Router.pathname == '/'){
              Router.push('/dashboard');
            }
          } else {
            Router.push('/');
          }
          
        })
      }else{
        this.setState({
          user:{
                name:user.name,
                email:user.email,
                photoUrl: user.photoUrl,
                emailVerified: user.emailVerified,
                uid: user.uid
            },
          isLogin:true
        })
        if ( Router.pathname == '/'){
          Router.push('/dashboard');
        }
      }
    this.getServiceAbout()
    this.getServiceDetailsVenue()
    this.getServiceDetailsWeddingDress()
    this.getServiceDetailsKugiran()
    this.getServiceDetailsPhotographer()
    this.getServiceDetailsVideographer()
    this.getServiceDetailsPelamin()
    this.getServiceDetailsMakeup()
    this.getServiceDetailsKadBanner()
    this.getServiceDetailsDoorGift()
    this.getServiceDetailsCaterer()
    this.getServiceDetailsHantaran()
    this.getServiceUpload()
    this.getVendorDetails()
  };
  signIn = async (email, password) => {
    try{
      let result =  await firebase.signIn(email, password);
      let user = result.user;
      console.log(user)
      if (user != null) {
        this.setState({
          user:{
                name:user.displayName,
                email:user.email,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
                uid: user.uid
            },
          isLogin:true
        },
        () =>  {
          console.log(this.state)
          localStorage.setItem('user', JSON.stringify({
            name:user.displayName,
            email:user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid
          }))
          Router.push('/dashboard')
        });
      }
    }catch(error){
      alert(error.message)
    }
     
  };
  saveVendorDetails = (id, details) => {
    this.setState({
      vendorDetails:details,
      vendorId:id
    })
    console.log(this.state)
    localStorage.setItem('vendorDetails', JSON.stringify({...details, id}) ) 
    
  }
  getVendorDetails = () => {
    let about = localStorage.getItem('vendorDetails');
    about = JSON.parse(about)
    if (about != null) {
      this.setState({vendorDetails:about})
    }
  }
  signOut = () => {
    // this.setState({
    //   user: null,
    //   isLogin:false
    // });
    firebase.signOut().then( ()=> {
      Router.push('/');
      localStorage.removeItem('user');
    })
  };
  check = async (email) =>{
    try{
      let exist = await firebase.check(email)
      let result = await exist.docs
      console.log(result);
      return result.length;
    }catch(error){
      alert(error.message)
    }
  }
  createAddService = (pagex) => {
    
    let {serviceType, serviceName, description, areaCovered, status, tnc, extra} = {...this.state.addServiceAbout}
    let {images} = {...this.state.addServiceUpload}
    let {email} = {...this.state.user}
    let {id} = {...this.state.vendorDetails}
    let objectType = `addServiceDetails${serviceType}`
    let serviceDetails = this.state[objectType]
    let x = new Date()
    let data = {
      vendorId:id,
      email,
      status,
      serviceType,
      serviceName,
      description,
      areaCovered,
      serviceDetails,
      images,
      tnc,
      extra,
      created: x,
      getTime: x.getTime()
    }

    let y = firebase.addService(serviceType, data)
    y.then(() => {
      alert('success')
      Router.push(`/${pagex}/done`)
    })
    .catch((e) => {
      console.log(e)
    })
  }
  updateAddService = (pagex) => {
    
    let {serviceType, serviceName, description, areaCovered, status, tnc, extra} = {...this.state.addServiceAbout}
    let {images, serviceId} = {...this.state.addServiceUpload}
    let {email} = {...this.state.user}
    let {id} = {...this.state.vendorDetails}
    let objectType = `addServiceDetails${serviceType}`
    let serviceDetails = this.state[objectType]
    let x = new Date()
    let data = {
      vendorId:id,
      email,
      status,
      serviceType,
      serviceName,
      description,
      areaCovered,
      serviceDetails,
      images,
      tnc,
      extra,
      created: x,
      getTime: x.getTime()
    }

    let y = firebase.updateService(serviceType, data, serviceId)
    y.then(() => {
      alert('success')
      Router.push(`/${pagex}/done`)
    })
    .catch((e) => {
      alert('error')
      console.log(e)
    })
  }
  getServiceDetailsEdit = (name, val, id) => {
    const x = this.state;
    const serv = x[name]
    console.log(serv)
    this.setState({[name]:val});
    localStorage.setItem([name], JSON.stringify(val) ) 
    return true

  }
  addServiceAboutTypeName = (type) => {
    let {addServiceAbout, addServiceUpload} = {...this.state}
    let currentService = addServiceAbout;
    let up = addServiceUpload;
    let typeName = type;
    currentService['serviceType'] = typeName;
    this.setState({addServiceAbout:currentService})


  }
  addServiceAbout = (name, area, desc, tnc, extra) => {
    let {addServiceAbout} = {...this.state}
    let currentService = addServiceAbout;
    let serviceName = name;
    let coveredArea = area;
    let description = desc;
    let terms = tnc;
    let ex = extra;
    currentService['serviceName'] = serviceName;
    currentService['areaCovered'] = coveredArea;
    currentService['description'] = description;
    currentService['tnc'] = terms;
    currentService['extra'] = ex;
    this.setState({addServiceAbout:currentService})
    localStorage.setItem('addServiceAbout', JSON.stringify(this.state.addServiceAbout) ) 
  }
  getServiceAbout = () => {
    let about = localStorage.getItem('addServiceAbout');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceAbout} = {...this.state}
      let currentService = addServiceAbout;
      let typeName = about.serviceType;
      let serviceName = about.serviceName;
      let coveredArea = about.areaCovered;
      let description = about.description;
      let terms = about.tnc;
      let ex = about.extra;
      currentService['serviceType'] = typeName;
      currentService['serviceName'] = serviceName;
      currentService['areaCovered'] = coveredArea;
      currentService['description'] = description;
      currentService['tnc'] = terms;
      currentService['extra'] = ex;
      this.setState({addServiceAbout:currentService})
    }
  }
  addServiceDetailsVenue = (hargax, lokasi, waktuOperasi, alamatPenuh, discount, hargaDiscount) => {
    let {addServiceDetailsVenue} = {...this.state}
    let currentService = addServiceDetailsVenue;
    let harga = parseInt(hargax);
    let lok = lokasi;
    let wo = waktuOperasi;
    let ap = alamatPenuh;
    let d = discount;
    let hd = hargaDiscount;
    currentService['discount'] = d;
    currentService['hargaDiscount'] = hd;
    currentService['harga'] = harga;
    currentService['lokasi'] = lok;
    currentService['waktuOperasi'] = wo;
    currentService['alamatPenuh'] = ap;
    this.setState({addServiceDetailsVenue:currentService})
    localStorage.setItem('addServiceDetailsVenue', JSON.stringify(this.state.addServiceDetailsVenue) ) 
  }
  getServiceDetailsVenue = () => { 
    let about = localStorage.getItem('addServiceDetailsVenue');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsVenue} = {...this.state}
      let currentService = addServiceDetailsVenue;
      let harga = about.harga;
      let lokasi = about.lokasi;
      let waktuOperasi = about.waktuOperasi;
      let alamatPenuh = about.alamatPenuh;
      let d = about.discount;
      let hd = about.hargaDiscount;
      currentService['discount'] = d;
      currentService['hargaDiscount'] = hd;
      currentService['harga'] = harga;
      currentService['lokasi'] = lokasi;
      currentService['waktuOperasi'] = waktuOperasi;
      currentService['alamatPenuh'] = alamatPenuh;
      this.setState({addServiceDetailsVenue:currentService})
    }
  }
  addServiceDetailsWeddingDress = (hargax, lokasi, syaratSewaan, jenisSewa, discount, hargaDiscount) => {
    let {addServiceDetailsWeddingDress} = {...this.state}
    let currentService = addServiceDetailsWeddingDress;
    let harga = hargax;
    let lok = lokasi;
    let wo = syaratSewaan;
    let js = jenisSewa;
    let d = discount;
    let hd = hargaDiscount;
    currentService['discount'] = d;
    currentService['hargaDiscount'] = hd;
    currentService['harga'] = harga;
    currentService['lokasi'] = lok;
    currentService['syaratSewaan'] = wo;
    currentService['jenisSewa'] = js;
    this.setState({addServiceDetailsWeddingDress:currentService})
    localStorage.setItem('addServiceDetailsWeddingDress', JSON.stringify(this.state.addServiceDetailsWeddingDress) ) 
  }
  getServiceDetailsWeddingDress = () => {
    let about = localStorage.getItem('addServiceDetailsWeddingDress');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsWeddingDress} = {...this.state}
      let currentService = addServiceDetailsWeddingDress;
      let harga = about.harga;
      let lokasi = about.lokasi;
      let syaratSewaan = about.syaratSewaan;
      let d = about.discount;
      let hd = about.hargaDiscount;
      currentService['discount'] = d;
      currentService['hargaDiscount'] = hd;
      currentService['harga'] = harga;
      currentService['lokasi'] = lokasi;
      currentService['syaratSewaan'] = syaratSewaan;
      this.setState({addServiceDetailsWeddingDress:currentService})
    }
  }
  addServiceDetailsKugiran = (hargax, lokasi, waktuOperasi, discount, hargaDiscount) => {
    let {addServiceDetailsKugiran} = {...this.state}
    let currentService = addServiceDetailsKugiran;
    let harga = hargax;
    let lok = lokasi;
    let wo = waktuOperasi;
    let d = discount;
    let hd = hargaDiscount;
    currentService['discount'] = d;
    currentService['hargaDiscount'] = hd;
    currentService['harga'] = harga;
    currentService['lokasi'] = lok;
    currentService['waktuOperasi'] = wo;
    this.setState({addServiceDetailsKugiran:currentService})
    localStorage.setItem('addServiceDetailsKugiran', JSON.stringify(this.state.addServiceDetailsKugiran) ) 
  }
  getServiceDetailsKugiran = () => {
    let about = localStorage.getItem('addServiceDetailsKugiran');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsKugiran} = {...this.state}
      let currentService = addServiceDetailsKugiran;
      let harga = about.harga;
      let lokasi = about.lokasi;
      let waktuOperasi = about.waktuOperasi;
      let d = about.discount;
      let hd = about.hargaDiscount;
      currentService['discount'] = d;
      currentService['hargaDiscount'] = hd;
      currentService['harga'] = harga;
      currentService['lokasi'] = lokasi;
      currentService['waktuOperasi'] = waktuOperasi;
      this.setState({addServiceDetailsKugiran:currentService})
    }
  }
  addServiceDetailsPhotographer = (harga, jenisEvent, discount, hargaDiscount) => {
    let {addServiceDetailsPhotographer} = {...this.state}
    let currentService = addServiceDetailsPhotographer;
    let har = harga;
    let je = jenisEvent;
    let d = discount;
    let hd = hargaDiscount;
    currentService['discount'] = d;
    currentService['hargaDiscount'] = hd;
    currentService['harga'] = har;
    currentService['jenisEvent'] = je;
    this.setState({addServiceDetailsPhotographer:currentService})
    localStorage.setItem('addServiceDetailsPhotographer', JSON.stringify(this.state.addServiceDetailsPhotographer) ) 
  }
  getServiceDetailsPhotographer = () => {
    let about = localStorage.getItem('addServiceDetailsPhotographer');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsPhotographer} = {...this.state}
      let currentService = addServiceDetailsPhotographer;
      let har = about.harga;
      let je = about.jenisEvent;
      let d = about.discount;
      let hd = about.hargaDiscount;
      currentService['discount'] = d;
      currentService['hargaDiscount'] = hd;
      currentService['harga'] = har;
      currentService['jenisEvent'] = je;
      this.setState({addServiceDetailsPhotographer:currentService})
    }
  }
  addServiceDetailsVideographer = (harga, jenisEvent, discount, hargaDiscount) => {
    let {addServiceDetailsVideographer} = {...this.state}
    let currentService = addServiceDetailsVideographer;
    let har = harga;
    let je = jenisEvent;
    let d = discount;
    let hd = hargaDiscount;
    currentService['discount'] = d;
    currentService['hargaDiscount'] = hd;
    currentService['harga'] = har;
    currentService['jenisEvent'] = je;
    this.setState({addServiceDetailsVideographer:currentService})
    localStorage.setItem('addServiceDetailsVideographer', JSON.stringify(this.state.addServiceDetailsVideographer) ) 
  }
  getServiceDetailsVideographer = () => {
    let about = localStorage.getItem('addServiceDetailsVideographer');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsVideographer} = {...this.state}
      let currentService = addServiceDetailsVideographer;
      let har = about.harga;
      let je = about.jenisEvent;
      let d = about.discount;
      let hd = about.hargaDiscount;
      currentService['discount'] = d;
      currentService['hargaDiscount'] = hd;
      currentService['harga'] = har;
      currentService['jenisEvent'] = je;
      this.setState({addServiceDetailsVideographer:currentService})
    }
  }
  addServiceDetailsPelamin = (harga, jenisEvent, discount, hargaDiscount) => {
    let {addServiceDetailsPelamin} = {...this.state}
    let currentService = addServiceDetailsPelamin;
    let har = harga;
    let je = jenisEvent;
    let d = discount;
    let hd = hargaDiscount;
    currentService['discount'] = d;
    currentService['hargaDiscount'] = hd;
    currentService['harga'] = har;
    currentService['jenisEvent'] = je;
    this.setState({addServiceDetailsPelamin:currentService})
    localStorage.setItem('addServiceDetailsPelamin', JSON.stringify(this.state.addServiceDetailsPelamin) ) 
  }
  getServiceDetailsPelamin = () => {
    let about = localStorage.getItem('addServiceDetailsPelamin');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsPelamin} = {...this.state}
      let currentService = addServiceDetailsPelamin;
      let har = about.harga;
      let je = about.jenisEvent;
      let d = about.discount;
      let hd = about.hargaDiscount;
      currentService['discount'] = d;
      currentService['hargaDiscount'] = hd;
      currentService['harga'] = har;
      currentService['jenisEvent'] = je;
      this.setState({addServiceDetailsPelamin:currentService})
    }
  }
  addServiceDetailsMakeup = (hargaTouchup, hargaFull, jenisMakeup, jantina) => {
    let {addServiceDetailsMakeup} = {...this.state}
    let currentService = addServiceDetailsMakeup;
    let harT = hargaTouchup;
    let harF = hargaFull;
    let je = jenisMakeup;
    let j = jantina;
    currentService['hargaTouchup'] = harT;
    currentService['hargaFull'] = harF;
    currentService['jenisMakeup'] = je;
    currentService['jantina'] = j;
    this.setState({addServiceDetailsMakeup:currentService})
    localStorage.setItem('addServiceDetailsMakeup', JSON.stringify(this.state.addServiceDetailsMakeup) ) 
  }
  getServiceDetailsMakeup = () => {
    let about = localStorage.getItem('addServiceDetailsMakeup');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsMakeup} = {...this.state}
      let currentService = addServiceDetailsMakeup;
      let harT = about.hargaTouchup;
      let harF = about.hargaFull;
      let je = about.jenisMakeup;
      let j = about.jantina;
      currentService['hargaTouchup'] = harT;
      currentService['hargaFull'] = harF;
      currentService['jenisMakeup'] = je;
      currentService['jantina'] = j;
      this.setState({addServiceDetailsMakeup:currentService})
    }
  }
  addServiceDetailsKadBanner = (hargaPerPerson, discount, banner, bannerSize, bannerDescription) => {
    //add kad first
    let {addServiceDetailsKadBanner} = {...this.state}
    let currentService = addServiceDetailsKadBanner;
    let har = hargaPerPerson;
    let disc = discount;
    let ba = banner;
    currentService['hargaPerPerson'] = har;
    currentService['discount'] = disc;
    currentService['banner'] = ba;

    if (ba) { //if banner true
      let {bannerDesc} = {...this.state.addServiceDetailsKadBanner}
      let bannerD = bannerDesc;
      let banS = bannerSize;
      let banD = bannerDescription;
      bannerD['bannerSize'] = banS;
      bannerD['description'] = banD;
      currentService['bannerDesc'] = bannerD;
    }

    this.setState({addServiceDetailsKadBanner:currentService})

    localStorage.setItem('addServiceDetailsKadBanner', JSON.stringify(this.state.addServiceDetailsKadBanner) ) 
  }

  getServiceDetailsKadBanner = () => {
    let about = localStorage.getItem('addServiceDetailsKadBanner');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsKadBanner} = {...this.state}
      let currentService = addServiceDetailsKadBanner;
      let har = about.hargaPerPerson;
      let disc = about.discount;
      let ba = about.banner;
      currentService['hargaPerPerson'] = har;
      currentService['discount'] = disc;
      currentService['banner'] = ba;

      if (ba) { //if banner true
        let {bannerDesc} = {...this.state.addServiceDetailsKadBanner}
        let bannerD = bannerDesc;
        let bannerDLS = about.bannerDesc //from localStorage
        let banS = bannerDLS.bannerSize;
        let banD = bannerDLS.bannerDescription;
        bannerD['bannerSize'] = banS;
        bannerD['banD'] = banD;
        currentService['bannerDesc'] = bannerD;
      }
      this.setState({addServiceDetailsKadBanner:currentService})
    }
  }

  addServiceDetailsCaterer = (hargaPerPerson, discount, senaraiLauk) => {
    //add kad first
    let {addServiceDetailsCaterer} = {...this.state}
    let currentService = addServiceDetailsCaterer;
    let har = hargaPerPerson;
    let disc = discount;
    let sl = senaraiLauk;
    currentService['hargaPerPerson'] = har;
    currentService['discount'] = disc;
    currentService['senaraiLauk'] = sl;

    this.setState({addServiceDetailsCaterer:currentService})

    localStorage.setItem('addServiceDetailsCaterer', JSON.stringify(this.state.addServiceDetailsCaterer) ) 
  }

  getServiceDetailsCaterer = () => {
    let about = localStorage.getItem('addServiceDetailsCaterer');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsCaterer} = {...this.state}
      let currentService = addServiceDetailsCaterer;
      let har = about.hargaPerPerson;
      let disc = about.discount;
      let sl = about.senaraiLauk;
      currentService['hargaPerPerson'] = har;
      currentService['discount'] = disc;
      currentService['senaraiLauk'] = sl;

      this.setState({addServiceDetailsCaterer:currentService})
    }
  }

  addServiceDetailsDoorGift = (hargaPerPerson, discount) => {
    //add kad first
    let {addServiceDetailsDoorGift} = {...this.state}
    let currentService = addServiceDetailsDoorGift;
    let har = hargaPerPerson;
    let disc = discount;
    currentService['hargaPerPerson'] = har;
    currentService['discount'] = disc;
    this.setState({addServiceDetailsDoorGift:currentService})

    localStorage.setItem('addServiceDetailsDoorGift', JSON.stringify(this.state.addServiceDetailsDoorGift) ) 
  }

  getServiceDetailsDoorGift = () => {
    let about = localStorage.getItem('addServiceDetailsDoorGift');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsDoorGift} = {...this.state}
      let currentService = addServiceDetailsDoorGift;
      let har = about.hargaPerPerson;
      let disc = about.discount;
      currentService['hargaPerPerson'] = har;
      currentService['discount'] = disc;
      this.setState({addServiceDetailsDoorGift:currentService})
    }
  }

  addServiceDetailsHantaran = (hargaPerPerson, discount) => {
    //add kad first
    let {addServiceDetailsHantaran} = {...this.state}
    let currentService = addServiceDetailsHantaran;
    let har = hargaPerPerson;
    let disc = discount;
    currentService['hargaPerPerson'] = har;
    currentService['discount'] = disc;
    this.setState({addServiceDetailsHantaran:currentService})

    localStorage.setItem('addServiceDetailsHantaran', JSON.stringify(this.state.addServiceDetailsHantaran) ) 
  }

  getServiceDetailsHantaran = () => {
    let about = localStorage.getItem('addServiceDetailsHantaran');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsHantaran} = {...this.state}
      let currentService = addServiceDetailsHantaran;
      let har = about.hargaPerPerson;
      let disc = about.discount;
      currentService['hargaPerPerson'] = har;
      currentService['discount'] = disc;
      this.setState({addServiceDetailsHantaran:currentService})
    }
  }

  addServiceDetailsKugiran = (namaKugiran, hargaKugiran) => {
    //add kad first
    let {addServiceDetailsKugiran} = {...this.state}
    let currentService = addServiceDetailsKugiran;
    let nk = namaKugiran;
    let kd = hargaKugiran;
    currentService['namaKugiran'] = nk;
    currentService['hargaKugiran'] = kd;
    this.setState({addServiceDetailsKugiran:currentService})

    localStorage.setItem('addServiceDetailsKugiran', JSON.stringify(this.state.addServiceDetailsKugiran) ) 
  }

  getServiceDetailsKugiran = () => {
    let about = localStorage.getItem('addServiceDetailsKugiran');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsKugiran} = {...this.state}
      let currentService = addServiceDetailsKugiran;
      let nk = about.namaKugiran;
      let kd = about.hargaKugiran;
      currentService['namaKugiran'] = nk;
      currentService['hargaKugiran'] = kd;
      this.setState({addServiceDetailsKugiran:currentService})
    }
  }

  addServiceUpload = (images, serviceType, serviceId) => {
    let {addServiceUpload} = {...this.state}
    let currentService = addServiceUpload;
    let im = images;
    let st = serviceType;
    let id = serviceId;
  
    currentService['images'] = im;
    currentService['serviceType'] = st;
    currentService['serviceId'] = id;
    this.setState({addServiceUpload:currentService})
    localStorage.setItem('addServiceUpload', JSON.stringify(this.state.addServiceUpload) ) 
  }

  getServiceUpload = () => {
    let Upload = localStorage.getItem('addServiceUpload');
    Upload = JSON.parse(Upload)
    if (Upload != null) {
      let {addServiceUpload} = {...this.state}
      let currentService = addServiceUpload;
      let im = Upload.images;
      let st = Upload.serviceType;
      let id = Upload.serviceId;
     
      currentService['serviceType'] = st;
      currentService['images'] = im;
      currentService['serviceId'] = id;
      this.setState({addServiceUpload:currentService})
    }
  }

  resetAddService = () => {
    this.setState(initialState)
    return true
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <LoginContext.Provider value={{ user: this.state.user, isLogin:this.state.isLogin, signIn: this.signIn, signOut: this.signOut, check:this.check, 
          getVendorDetails:this.state.vendorDetails, getVendorId:this.state.vendorId,
            saveVendorDetails:this.saveVendorDetails}}>
            <AddServiceContext.Provider value={{addServiceAbout: this.addServiceAbout, getServiceAbout:this.state.addServiceAbout, addServiceAboutTypeName:this.addServiceAboutTypeName,
            addServiceDetailsVenue:this.addServiceDetailsVenue, getServiceDetailsVenue:this.state.addServiceDetailsVenue,
            addServiceDetailsPhotographer:this.addServiceDetailsPhotographer, getServiceDetailsPhotographer:this.state.addServiceDetailsPhotographer,
            addServiceDetailsVideographer:this.addServiceDetailsVideographer, getServiceDetailsVideographer:this.state.addServiceDetailsVideographer,
            addServiceDetailsPelamin:this.addServiceDetailsPelamin, getServiceDetailsPelamin:this.state.addServiceDetailsPelamin,
            addServiceDetailsWeddingDress:this.addServiceDetailsWeddingDress, getServiceDetailsWeddingDress:this.state.addServiceDetailsWeddingDress,
            addServiceDetailsMakeup:this.addServiceDetailsMakeup, getServiceDetailsMakeup:this.state.addServiceDetailsMakeup,
            addServiceDetailsKadBanner:this.addServiceDetailsKadBanner, getServiceDetailsKadBanner:this.state.addServiceDetailsKadBanner,
            addServiceDetailsCaterer:this.addServiceDetailsCaterer, getServiceDetailsCaterer:this.state.addServiceDetailsCaterer,
            addServiceDetailsDoorGift:this.addServiceDetailsDoorGift, getServiceDetailsDoorGift:this.state.addServiceDetailsDoorGift,
            addServiceDetailsKugiran:this.addServiceDetailsKugiran, getServiceDetailsKugiran:this.state.addServiceDetailsKugiran,
            addServiceDetailsHantaran:this.addServiceDetailsHantaran, getServiceDetailsHantaran:this.state.addServiceDetailsHantaran,
            addServiceUpload:this.addServiceUpload, getServiceUpload:this.state.addServiceUpload,
            getReview:this.state, createAddService:this.createAddService, updateAddService:this.updateAddService, resetAddService:this.resetAddService, getServiceDetailsEdit:this.getServiceDetailsEdit  }}>
              <Component {...pageProps} />
            </AddServiceContext.Provider>
        </LoginContext.Provider>
      </Container>
    );
  }
}

export default MyApp