import React, { useEffect, useState } from 'react'
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
import Link from 'next/link'
import masterLayout from '../components/hoc/masterLayout'
import {useRouter} from 'next/router'

import firebase from '../config/firebaseConfig'

export function Headx({title, children}){
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    
    function toggle() {
        setIsOpen(!isOpen)
    }

    function logout() {
        firebase.signOut().then( ()=> {
            localStorage.removeItem('user');
            router.push('/')

          })
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWnC2crGKbK0zzmYvXCrrnikRpVX8rtQo&libraries=places"></script>
            </Head>
                <Navbar className="navbar-custom" color="white" light expand="md">
                    <NavbarBrand href="/"><img className="logo-header" src="/images/logos/logo-officialx2.png"/></NavbarBrand>
                    <NavbarToggler onClick={()=>toggle()} />
                    {
                        router.pathname != '/'  && router.pathname != '/signup' && router.pathname != '/terma'?
                        <Collapse navbar>
                            <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Inbox</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    <img className="logo-user" src="/images/logos/logo-userx2.png"/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                <DropdownItem>
                                    <Link href={'/editservice'}>
                                    <a>
                                    Service
                                    </a>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link disabled href={`javascript:void(0);`}>
                                    <a>
                                    Package
                                    </a>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link href={'/update-user'}>
                                    <a>
                                    Update user
                                    </a>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={()=> logout()}>
                                    LogOut
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                        :''
                    }
                    
                </Navbar>
                {children} 
        </div>
        
    )
}

export default masterLayout(Headx)
