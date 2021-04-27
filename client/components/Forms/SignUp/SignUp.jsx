import React, { Component } from "react";

// Redux imports
import { connect } from "react-redux";
import { addUser } from "../../../actionCreators/allUsers";

// Styles Import
import "../../../../public/assets/signup.css";

// Script Imports
import resetSignUpFormStyles from "./resetSignUpFormStyles";
import signUpValidator from "./signUpValidator";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();

        // Determines if our input is valid, modifies DOM
        const allValid = signUpValidator();

        // This will send the data to a thunk to create the user in a POST route
        if (allValid) {
        }
    }

    // Modifies the state to reflect current text in input fields
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    render() {
        const { email, username, password, confirmPassword } = this.state;

        return (
            <div className="primary-screen">
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form id="sign-up-form" onSubmit={this.handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={this.handleChange}
                                id="email-input"
                                name="email"
                                type="text"
                                placeholder="Enter email"
                            />
                            <small>Error message</small>
                        </div>
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
                        <div className="form-control">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                value={confirmPassword}
                                onChange={this.handleChange}
                                id="confirmPassword-input"
                                name="confirmPassword"
                                type="password"
                                placeholder="Enter password"
                            />
                            <small>Error message</small>
                        </div>
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: (user) => dispatch(addUser(user)),
    };
}

export default connect(null, mapDispatchToProps)(SignUp);
