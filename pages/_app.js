import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import LoginContext from '../contexts/LoginContext';
import firebase from '../config/firebaseConfig';
import AddServiceContext from '../contexts/AddServiceContext'

class MyApp extends App {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      isLogin:false,
      addServiceAbout:{
        serviceType:'',
        serviceName:'',
        description:'',
        areaCovered:[],
        status:'pending'
      },
      addServiceDetailsVenue:{
        hargaSewa:0,
        lokasi:'',
        waktuOperasi:''
      },
      addServiceDetailsWeddingDress:{
        hargaSewa:0,
        lokasi:'',
        waktuOperasi:''
      },
      addServiceDetailsKugiran:{
        hargaSewa:0,
        lokasi:'',
        waktuOperasi:''
      },
      addServiceDetailsPhotographer:{
        harga:0,
        jenisEvent:[]
      },
      addServiceDetailsVideographer:{
        harga:0,
        jenisEvent:[]
      },
      addServiceDetailsPelamin:{
        harga:0,
        jenisEvent:[]
      },
      addServiceDetailsMakeup:{
        hargaTouchup:0,
        hargaFull:0,
        jenisMakeup:[],
        jantina:[]
      },
      addServiceDetailsKadBanner:{
        hargaPerPerson:0,
        discount:[],
        banner:false,
        bannerDesc:{
          bannerSize:[],
          description:''
        }
      },
      addServiceDetailsCaterer:{
        hargaPerPerson:0,
        discount:[],
        senaraiLauk:[]
      },
      addServiceDetailsDoorGift:{
        hargaPerPerson:0,
        discount:[]
      },
      addServiceDetailsHantaran:{
        hargaPerPerson:0,
        discount:[]
      },
      addServiceDetailsKugiran:{
        namaKugiran:'',
        hargaKugiran:0
      }
    };
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
          console.log(this.state)
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
  addServiceAboutTypeName = (type) => {
    let {addServiceAbout} = {...this.state}
    let currentService = addServiceAbout;
    let typeName = type;
    currentService['serviceType'] = typeName;
    this.setState({addServiceAbout:currentService})
  }
  addServiceAbout = (name, area, desc) => {
    let {addServiceAbout} = {...this.state}
    let currentService = addServiceAbout;
    let serviceName = name;
    let coveredArea = area;
    let description = desc;
    currentService['serviceName'] = serviceName;
    currentService['areaCovered'] = coveredArea;
    currentService['description'] = description;
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
      currentService['serviceType'] = typeName;
      currentService['serviceName'] = serviceName;
      currentService['areaCovered'] = coveredArea;
      currentService['description'] = description;
      this.setState({addServiceAbout:currentService})
    }
  }

  addServiceDetailsVenue = (harga, lokasi, waktuOperasi) => {
    let {addServiceDetailsVenue} = {...this.state}
    let currentService = addServiceDetailsVenue;
    let hargaSewa = harga;
    let lok = lokasi;
    let wo = waktuOperasi;
    currentService['hargaSewa'] = hargaSewa;
    currentService['lokasi'] = lok;
    currentService['waktuOperasi'] = wo;
    this.setState({addServiceDetailsVenue:currentService})
    localStorage.setItem('addServiceDetailsVenue', JSON.stringify(this.state.addServiceDetailsVenue) ) 
  }

  getServiceDetailsVenue = () => {
    let about = localStorage.getItem('addServiceDetailsVenue');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsVenue} = {...this.state}
      let currentService = addServiceDetailsVenue;
      let hargaSewa = about.harga;
      let lokasi = about.lokasi;
      let waktuOperasi = about.waktuOperasi;
      currentService['hargaSewa'] = hargaSewa;
      currentService['lokasi'] = lokasi;
      currentService['waktuOperasi'] = waktuOperasi;
      this.setState({addServiceDetailsVenue:currentService})
    }
  }

  addServiceDetailsWeddingDress = (harga, lokasi, waktuOperasi) => {
    let {addServiceDetailsWeddingDress} = {...this.state}
    let currentService = addServiceDetailsWeddingDress;
    let hargaSewa = harga;
    let lok = lokasi;
    let wo = waktuOperasi;
    currentService['hargaSewa'] = hargaSewa;
    currentService['lokasi'] = lok;
    currentService['waktuOperasi'] = wo;
    this.setState({addServiceDetailsWeddingDress:currentService})
    localStorage.setItem('addServiceDetailsWeddingDress', JSON.stringify(this.state.addServiceDetailsWeddingDress) ) 
  }

  getServiceDetailsWeddingDress = () => {
    let about = localStorage.getItem('addServiceDetailsWeddingDress');
    about = JSON.parse(about)
    if (about != null) {
      let {addServiceDetailsWeddingDress} = {...this.state}
      let currentService = addServiceDetailsWeddingDress;
      let hargaSewa = about.harga;
      let lokasi = about.lokasi;
      let waktuOperasi = about.waktuOperasi;
      currentService['hargaSewa'] = hargaSewa;
      currentService['lokasi'] = lokasi;
      currentService['waktuOperasi'] = waktuOperasi;
      this.setState({addServiceDetailsWeddingDress:currentService})
    }
  }

  addServiceDetailsKugiran = (harga, lokasi, waktuOperasi) => {
    let {addServiceDetailsKugiran} = {...this.state}
    let currentService = addServiceDetailsKugiran;
    let hargaSewa = harga;
    let lok = lokasi;
    let wo = waktuOperasi;
    currentService['hargaSewa'] = hargaSewa;
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
      let hargaSewa = about.harga;
      let lokasi = about.lokasi;
      let waktuOperasi = about.waktuOperasi;
      currentService['hargaSewa'] = hargaSewa;
      currentService['lokasi'] = lokasi;
      currentService['waktuOperasi'] = waktuOperasi;
      this.setState({addServiceDetailsKugiran:currentService})
    }
  }

  addServiceDetailsPhotographer = (harga, jenisEvent) => {
    let {addServiceDetailsPhotographer} = {...this.state}
    let currentService = addServiceDetailsPhotographer;
    let har = harga;
    let je = jenisEvent;
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
      currentService['harga'] = har;
      currentService['jenisEvent'] = je;
      this.setState({addServiceDetailsPhotographer:currentService})
    }
  }

  addServiceDetailsVideographer = (harga, jenisEvent) => {
    let {addServiceDetailsVideographer} = {...this.state}
    let currentService = addServiceDetailsVideographer;
    let har = harga;
    let je = jenisEvent;
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
      currentService['harga'] = har;
      currentService['jenisEvent'] = je;
      this.setState({addServiceDetailsVideographer:currentService})
    }
  }

  addServiceDetailsPelamin = (harga, jenisEvent) => {
    let {addServiceDetailsPelamin} = {...this.state}
    let currentService = addServiceDetailsPelamin;
    let har = harga;
    let je = jenisEvent;
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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <LoginContext.Provider value={{ user: this.state.user, isLogin:this.state.isLogin, signIn: this.signIn, signOut: this.signOut, check:this.check }}>
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
            addServiceDetailsKugiran:this.addServiceDetailsKugiran, getServiceDetailsKugiran:this.state.addServiceDetailsKugiran }}>
              <Component {...pageProps} />
            </AddServiceContext.Provider>
        </LoginContext.Provider>
      </Container>
    );
  }
}

export default MyApp