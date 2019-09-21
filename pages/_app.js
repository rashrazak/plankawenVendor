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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <LoginContext.Provider value={{ user: this.state.user, isLogin:this.state.isLogin, signIn: this.signIn, signOut: this.signOut, check:this.check }}>
            <AddServiceContext.Provider value={{addServiceAbout: this.addServiceAbout, getServiceAbout:this.state.addServiceAbout, addServiceAboutTypeName:this.addServiceAboutTypeName,
            addServiceDetailsVenue:this.addServiceDetailsVenue, getServiceDetailsVenue:this.state.addServiceDetailsVenue }}>
              <Component {...pageProps} />
            </AddServiceContext.Provider>
        </LoginContext.Provider>
      </Container>
    );
  }
}

export default MyApp