import React, { Component } from "react";
import { connect } from "react-redux";

class GoogleSignUp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <a href="/api/auth/google">
                    <div className="oauth-container">
                        <img
                            className="oauth-img"
                            src="/images/utils/googleOAuth.png"
                            alt=""
                        />
                    </div>
                </a>
            </div>
        );
    }
}

export default connect()(GoogleSignUp);
