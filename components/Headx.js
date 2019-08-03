import React, { Component } from 'react'
import Head from 'next/head'
import '../css/bootstrap.min.css'
import '../css/index.css'

export class Headx extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                    {this.props.children}   
                
            </div>
            
        )
    }
}

export default Headx
