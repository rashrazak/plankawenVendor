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
        serviceType:null,
        serviceName:null,
        description:null,
        areaCovered:[],
      },
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
      console.log(this.state)
      if ( Router.pathname == '/'){
        Router.push('/dashboard');
      }
    }
    
    // if (userx == false) {
    // }else{
    //   // this.getUser();
    //   Router.push('/dashboard')
    // }
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

  addServiceAbout = ({serviceType, serviceName, areaCovered, description}) => {
    this.setState({
      addServiceAbout:{
        serviceType:serviceType,
        serviceName:serviceName,
        description:description,
        areaCovered:areaCovered,
      }
    })
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <LoginContext.Provider value={{ user: this.state.user, isLogin:this.state.isLogin, signIn: this.signIn, signOut: this.signOut, check:this.check }}>
            <AddServiceContext.Provider value={{addServiceAbout: this.addServiceAbout, getServiceAbout:this.state.addServiceAbout}}>
              <Component {...pageProps} />
            </AddServiceContext.Provider>
        </LoginContext.Provider>
      </Container>
    );
  }
}

export default MyApp