import React, { Component } from "react";

// Redux Imports
const { connect } = require("react-redux");

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            username,
            userType,
        } = this.props.user;
        return <div className="primary-screen"></div>;
    }
}

function mapStateToProps(state) {
    return {
        user: state.singleUser,
    };
}

export default connect(mapStateToProps)(SingleUser);
