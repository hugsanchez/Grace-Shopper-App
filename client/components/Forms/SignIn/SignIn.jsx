import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";
import { authUser } from "../../../store/actionCreators/singleUser";

// React-Router Imports
import { NavLink } from "react-router-dom";

// Style Imports
import "../../../../public/assets/signin.css";

// Script Imports
import signInValidator from "./signInValidator";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Handles sign in submission/error checking
    handleSubmit(ev) {
        ev.preventDefault();

        // Determines if our input is valid, modifies DOM
        const allValid = signInValidator();

        // This will send the data to a thunk to authorize the sign in
        if (allValid) {
            const { username, password } = this.state;
            this.props.signIn({ username, password });

            // Resets our state to blank
            this.setState({
                username: "",
                password: "",
            });
        }
    }

    // Modifies the state to reflect current text in input fields
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    render() {
        const { username, password } = this.state;

        return (
            <div className="primary-screen">
                <div className="form-container">
                    <h2>Sign In</h2>
                    <form id="sign-up-form" onSubmit={this.handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={this.handleChange}
                                id="username-input"
                                name="username"
                                type="text"
                                placeholder="Enter username"
                            />
                            <small>Error message</small>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={this.handleChange}
                                id="password-input"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                            />
                            <small>Error message</small>
                        </div>
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                    <p id="sign-up-prompt">
                        New here?{" "}
                        <span>
                            <NavLink to="/sign-up">Sign Up</NavLink>
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: (user) => dispatch(authUser(user)),
    };
}

export default connect(null, mapDispatchToProps)(SignIn);
