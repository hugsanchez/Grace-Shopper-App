import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";

// React-Router Imports
import { Switch, NavLink } from "react-router-dom";

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user, isSignedIn } = this.props.signInInfo;

        // You can only see a profile if you are signed in
        if (!isSignedIn) {
            return (
                <div className="primary-screen">
                    Please login to view your profile
                </div>
            );
        }

        // If signed in, get user properties
        const { id, firstName, lastName, email, username, userType } = user;

        return (
            <div className="primary-screen">
                <header className="user-header">
                    <div className="user-header-container">
                        <NavLink to={`/user/${id}/profile`} name="profile">
                            Account
                        </NavLink>
                    </div>
                    <div className="user-header-container">
                        <NavLink to={`/user/${id}/profile`} name="orders">
                            Orders
                        </NavLink>
                    </div>
                </header>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        signInInfo: state.signedIn,
    };
}

export default connect(mapStateToProps)(SingleUser);
