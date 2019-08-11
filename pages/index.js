import React, { Component } from 'react'
import Head from '../components/Headx'
import Login from '../components/Login';

export default class index extends Component {
    render() {
        return (
            <Head title={'Hello Admin'}>
                <div className="body-layout">
                    <Login/>
                </div>
            </Head>
        )
    }
}