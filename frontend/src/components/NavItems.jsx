import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo/logo.png"
import { clearJWT, getUsername, isAuthenticated, isUserAdmin } from '../helpers/auth';


const NavItems = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);

    const navigate = useNavigate();

    //addevent listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            setHeaderFixed(true);
        } else {
            setHeaderFixed(false);
        }
    })

    const signoutClick = () => {
        clearJWT();
        navigate("/", { replace: true });
    }

    return (
        <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
            {/* header top start */}
            <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
                <div className='container'>
                    {!isAuthenticated() && <div className='header-top-area'>
                        <Link to="/signup" className='lab-btn me-3'><span>Create Account</span></Link>
                        <Link to="/login">Login</Link>
                    </div>}
                    {isAuthenticated() && <Link className="dropdown-item" to="/" onClick={signoutClick}>
                        <i className="fa-solid fa-square-plus"></i> Sign-out ({getUsername()})
                    </Link>}

                </div>
            </div>

            {/*header bottom */}
            <div className='header-bottom'>
                <div className='container'>
                    <div className='header-wrapper'>
                        {/* logo*/}
                        <div className='logo-search-acte'>
                            <Link to={"/"}>
                                <img src={logo} alt="" style={{ width: '180px', height: 'auto' }} />
                            </Link>
                        </div>

                        {/* menu area*/}
                        <div className='menu-area'>
                            <div className='menu'>
                                {!isUserAdmin() && <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                    {isAuthenticated() &&
                                        <>
                                            <li><Link to="/cart-page">Cart</Link></li>
                                            <li><Link to="/profile">My Profile</Link></li>
                                        </>
                                    }

                                </ul>}
                                {isUserAdmin() && <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link to="/admin/listuser">List Users</Link></li>
                                    <li><Link to="/admin/listproduct">List Products</Link></li>
                                    <li><Link to="/admin/listorders">List Orders</Link></li>
                                </ul>}

                            </div>

                            {/*sign in & log in*/}
                            {!isAuthenticated() &&
                                <>
                                    <Link to="/sign-up" className='lab-btn me-3 d-none d-md-block'>Create Account</Link>
                                    <Link to="/login" className='d-none d-md-block'>Log In</Link>
                                </>
                            }
                            {isAuthenticated() && <Link className="nav-link" to="/" onClick={signoutClick}>
                                <i className="fa-solid fa-square-plus"></i> Sign-out ({getUsername()})
                            </Link>}


                            {/* menu toggler */}
                            <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            {/* social toggler*/}
                            <div className="ellepsis-bar d-md-none"
                                onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavItems
