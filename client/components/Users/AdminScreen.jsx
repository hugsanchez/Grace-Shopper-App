import React, { Component } from "react";

class AdminScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <div id="order-title-container" className="order-item">
                    <h3 id="order-title">Admin Portal</h3>
                </div>
                <div className="admin-selection-container">
                    <div id="admin-users-portal" className="admin-portal">
                        <img
                            src="/images/artwork/admin-inventory-portal.png"
                            alt=""
                        />
                    </div>
                    <div
                        id="admin-products-portal"
                        className="admin-portal"
                    ></div>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminScreen;
