import React, { Component } from "react";

// Style Import
import "../../public/assets/header.css";

// Redux Imports
import { connect } from "react-redux";
import { logOutUser } from "../store/actionCreators/singleUser";

// React Router Links
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { user, isSignedIn } = this.props.loginStatus;

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
                    {isSignedIn ? (
                        // If signed in, display welcome, else, display sign-in
                        <React.Fragment>
                            <NavLink
                                to={`/user/${user.id}`}
                                className="header-link"
                            >
                                <h3>{user.username}</h3>
                            </NavLink>
                            <NavLink
                                to="/sign-in"
                                className="header-link"
                                onClick={this.props.logout}
                            >
                                <h3>Logout</h3>
                            </NavLink>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <NavLink to={"#"} className="header-link">
                                <h3>Guest</h3>
                            </NavLink>
                            <NavLink to="/sign-in" className="header-link">
                                <h3>Sign In</h3>
                            </NavLink>
                        </React.Fragment>
                    )}
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

function mapStateToProps(state) {
    return {
        loginStatus: state.signedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logOutUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
