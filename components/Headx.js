import React, { useContext, useState } from 'react'
import LoginContext from '../contexts/LoginContext'
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
import Footer from '../components/footer'
import {useRouter} from 'next/router'

import firebase from '../config/firebaseConfig'

export function Headx({title, children}){
    const router = useRouter()
    const {getVendorDetails} = useContext(LoginContext)
    
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function logout() {
        firebase.signOut().then( ()=> {
            localStorage.removeItem('user');
            localStorage.removeItem('vendorDetails');
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
                    <NavbarToggler onClick={toggle} />
                    {
                        router.pathname != '/'  && router.pathname != '/signup' && router.pathname != '/terma'?
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><img className={`icon-bell`} src="/images/icon/bell.png"/></NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    {
                                        getVendorDetails && 
                                        <h4><span><div className={`oval-pic`}><img className="logo-user" src="/images/logos/logo-userx2.png"/></div> </span>{getVendorDetails.namaPemilik}</h4>

                                    }
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
                                    <Link href={`/`}>
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
                <Footer />
                <style jsx>{`
                    .oval-pic { width: 45px; height: 45px; border-radius: 50%; background-color: #9B9B9B; overflow: hidden; display: inline-block; vertical-align: middle;}
                    .oval-pic img { object-fit: cover; width: 100%;}
                    h4 { font-size: 14px; color: #3E3E3E; font-weight: 500; margin: 0;}
                `}</style>
        </div>
        
    )
}

export default masterLayout(Headx)
