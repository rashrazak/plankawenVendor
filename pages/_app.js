import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import LoginContext from '../contexts/LoginContext';
import firebase from '../config/firebaseConfig';

class MyApp extends App {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      isLogin:false
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
        if ( Router.pathname == '/'){
          Router.push('/dashboard');
        }
      } else {
        Router.push('/');
      }
      
    })
    
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
          Router.push('/dashboard')
        });
      }
    }catch(error){
      alert(error.message)
    }
     
  };

  signOut = () => {
    firebase.signOut().then( ()=> {
      this.setState({
        user: null,
        isLogin:false
      });
      Router.push('/');
    })
  };

  check = async (email) =>{
    try{
      let exist = await firebase.check(email)
      let result = await exist.docs
      return result.length;
    }catch(error){
      alert(error.message)
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <LoginContext.Provider value={{ user: this.state.user, isLogin:this.state.isLogin, signIn: this.signIn, signOut: this.signOut, check:this.check }}>
          <Component {...pageProps} />
        </LoginContext.Provider>
      </Container>
    );
  }
}

export default MyApp