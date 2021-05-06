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
                        {/* <img src="/images/utils/brush.png" alt="" id="main-logo" /> */}
                        <h1 id="main-title">Art Black Market</h1>
                    </NavLink>
                </div>
                <div className="header-group">
                    <NavLink
                        to="/store"
                        className="header-link"
                        id="store-link"
                    >
                        <h2>Store</h2>
                    </NavLink>
                    {isSignedIn ? (
                        // If signed in, display welcome, else, display sign-in
                        <React.Fragment>
                            <NavLink
                                to={`/user/${user.id}/profile`}
                                className="header-link"
                            >
                                <h2>{user.username}</h2>
                            </NavLink>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <NavLink to={"#"} className="header-link">
                                <h2>Guest</h2>
                            </NavLink>
                            <NavLink to="/sign-in" className="header-link">
                                <h2>Sign In</h2>
                            </NavLink>
                        </React.Fragment>
                    )}
                    <NavLink to="/cart" id="cart-link" className="header-link">
                        <img
                            src="/images/utils/cart.png"
                            alt=""
                            id="cart-img"
                        />
                        <h2>&nbsp; Cart</h2>
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
