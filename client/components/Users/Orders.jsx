import React, { Component } from "react";

// Style Import
import "../../../public/assets/user.css";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div id="account-title-container" className="account-item">
                    <h3 id="account-title">Order History</h3>
                </div>
            </React.Fragment>
        );
    }
}

export default Orders;
