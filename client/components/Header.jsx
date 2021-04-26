import React, { Component } from "react";

// React Router Links
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <header id="app-header">
                <div id="header-logo" className="header-group">
                    <NavLink to="/">
                        <img src="/images/logo.png" alt="" id="main-logo" />
                    </NavLink>
                </div>
                <div id="main-header-links" className="header-group">
                    <NavLink to="/paintings" className="header-link">
                        Paintings
                    </NavLink>
                    <NavLink to="/sculptures" className="header-link">
                        Sculptures
                    </NavLink>
                    <NavLink to="/artists" className="header-link">
                        Artists
                    </NavLink>
                </div>
                <div className="header-group">
                    <NavLink to="/sign-in" className="header-link">
                        Sign In
                    </NavLink>
                    <NavLink
                        to="/cart"
                        id="header-cart-link"
                        className="header-link"
                    >
                        Cart
                        <img src="/images/cart.png" alt="" id="cart-img" />
                    </NavLink>
                </div>
            </header>
        );
    }
}

export default Header;
