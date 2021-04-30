import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";

// Style Import
import "../../../public/assets/user.css";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;
        const { id, firstName, lastName, email, username, userType } = user;
        return (
            <React.Fragment>
                <div id="account-title-container" className="account-item">
                    <h3 id="account-title">Account Information</h3>
                </div>
                <div id="name-controller" className="account-item">
                    <h4>Name</h4>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.signedIn.user,
    };
}

export default connect(mapStateToProps)(Account);
