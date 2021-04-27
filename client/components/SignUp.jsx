import React, { Component } from "react";

// Styles Import
import "../../public/assets/signup.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
    }

    // Modifies the state to reflect current text in input fields
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    render() {
        const { email, username, password } = this.state;

        return (
            <div className="primary-screen">
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form className="sign-up-form" onSubmit={this.handleSubmit}>
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
                                value={username}
                                onChange={this.handleChange}
                                id="password-input"
                                name="password"
                                type="text"
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

export default SignUp;
