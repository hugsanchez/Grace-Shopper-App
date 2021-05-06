import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";

// Style Import
import "../../../public/assets/user.css";

// Component Imports
import OrderItem from "./OrderItem.jsx";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;

        return (
            <React.Fragment>
                <div id="order-title-container" className="order-item">
                    <h3 id="order-title">Order History</h3>
                </div>
                <div id="orders-container">
                    {user.orders.length
                        ? user.orders.map((order) => (
                              <OrderItem {...order} key={order.id} />
                          ))
                        : "No Orders"}
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

export default connect(mapStateToProps)(Orders);
