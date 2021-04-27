import React, { Component } from "react";

// Redux Imports

// React-Router Imports
import { NavLink } from "react-router-dom";

// Styles
import "../../../../public/assets/signin.css";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Handles sign in submission/error checking
    handleSubmit(ev) {}

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

export default SignIn;
