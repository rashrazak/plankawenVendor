import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import LoginContext from '../contexts/LoginContext';

export default class MyApp extends App {
  state = {
    email: null
  };
  

  getLocalStorage() {
    const emailx = localStorage.getItem('coolapp-email');

    return emailx;
      
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
    let email = this.getLocalStorage();
    if (email) {
      this.setState({
        email
      });
    } else {
      Router.push('/');
    }
  };

  signIn = (email, password) => {
    localStorage.setItem('coolapp-email', email);

    this.setState(
      {
        email: email
      },
      () => {
        Router.push('/dashboard');
      }
    );
  };

  signOut = () => {
    localStorage.removeItem('coolapp-email');
    this.setState({
      email: null
    });
    Router.push('/');
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <LoginContext.Provider value={{ email: this.state.email, signIn: this.signIn, signOut: this.signOut }}>
          <Component {...pageProps} />
        </LoginContext.Provider>
      </Container>
    );
  }
}