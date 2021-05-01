import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";

// Style Import
import "../../../public/assets/user.css";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            userValues: { ...props.user },
            preValues: { ...props.user },
        };
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
                    <form onSubmit={this.handleSubmit} className="detail-form">
                        <div className="user-item-container">
                            <h4>Name</h4>
                            <div
                                className="user-subtext"
                                id="user-name-container"
                            >
                                <p>
                                    {firstName} {lastName}
                                </p>
                            </div>
                        </div>
                        <div className="user-item-container">
                            <h4>Username</h4>
                            <div
                                className="user-subtext"
                                id="user-username-container"
                            >
                                <p>{username}</p>
                            </div>
                        </div>
                        <div className="user-item-container">
                            <h4>Personal Information</h4>
                            <div
                                className="user-subtext"
                                id="user-information-container"
                            >
                                <p className="pre-text">Email: </p>
                                <p>{email}</p>
                            </div>
                        </div>
                        <div className="user-container-button">
                            <a
                                className="edit-link"
                                onClick={this.toggleEditing}
                            >
                                edit
                            </a>
                        </div>
                    </form>
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
