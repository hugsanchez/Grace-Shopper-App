import React, { Component } from "react";

// Style Import
import "../../public/assets/header.css";

// React Router Links
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <header id="app-header">
                <div id="header-logo" className="header-group">
                    <NavLink
                        to="/"
                        className="header-link"
                        id="main-header-link"
                    >
                        <img
                            src="/images/utils/brush.png"
                            alt=""
                            id="main-logo"
                        />
                        <h1 id="main-title">AppName</h1>
                    </NavLink>
                </div>
                <div id="main-header-links" className="header-group">
                    <NavLink to="/artists" className="header-link">
                        <h2>Artists</h2>
                    </NavLink>
                    <NavLink
                        to="/store"
                        className="header-link"
                        id="store-link"
                    >
                        <h2>Store</h2>
                    </NavLink>
                </div>
                <div className="header-group">
                    <NavLink to="/sign-in" className="header-link">
                        <h3>Sign In</h3>
                    </NavLink>
                    <NavLink
                        to="/sign-up"
                        className="header-link"
                        id="register-link"
                    >
                        <h3>Register</h3>
                    </NavLink>
                    <NavLink to="#" className="header-link">
                        <img
                            src="images/utils/search.png"
                            alt=""
                            id="search-img"
                        />
                    </NavLink>
                    <NavLink to="/cart" className="header-link">
                        <img
                            src="/images/utils/cart.png"
                            alt=""
                            id="cart-img"
                        />
                    </NavLink>
                </div>
            </header>
        );
    }
}

export default Header;
