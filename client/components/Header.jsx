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
                <div id="header-logo">
                    <NavLink to="/">AppName</NavLink>
                </div>
                <div id="header-links">
                    <NavLink to="/paintings" className="header-link">
                        Paintings
                    </NavLink>
                    <NavLink to="/sculptures" className="header-link">
                        Sculptures
                    </NavLink>
                    <NavLink
                        to="/about-us"
                        id="about-us"
                        className="header-link"
                    >
                        About Us
                    </NavLink>
                </div>
            </header>
        );
    }
}

export default Header;
