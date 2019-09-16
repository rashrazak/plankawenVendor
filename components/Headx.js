import React, { Component } from 'react'
import Head from 'next/head'
import '../css/bootstrap.min.css'
import '../css/index.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import masterLayout from '../components/hoc/masterLayout'

export class Headx extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
    toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
    }
    render() {
        return (
            <div>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                    <Navbar className="navbar-custom" color="white" light expand="md">
                        <NavbarBrand href="/"><img className="logo-header" src="/static/images/logos/logo-officialx2.png"/></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        {/* <Collapse isOpen={this.state.isOpen} navbar> */}
                        <Collapse navbar>
                            <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Inbox</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    <img className="logo-user" src="/static/images/logos/logo-userx2.png"/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    {this.props.children} 
            </div>
            
        )
    }
}

export default masterLayout(Headx)
