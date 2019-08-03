import React, { Component } from 'react'
import Head from 'next/head'
import '../css/index.css'
import '../css/bootstrap.min.css'
import Login from '../components/Login';


export default class index extends Component {
    render() {
        return (
            <div class="body-layout">
                <Login></Login>
            </div>
        )
    }
}
