import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}></form>
            </div>
        );
    }
}

export default SignUp;
