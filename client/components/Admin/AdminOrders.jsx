import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";
import { getSingleUser } from "../../store/actionCreators/singleUser";

import AdminOrderItem from "./AdminOrderItem.jsx";

class AdminOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: true,
            user: null,
        };
    }

    async componentDidMount() {
        const { id } = this.state;

        await this.props.getUser(id);
        const { user } = this.props;

        this.setState({
            ...this.state,
            user,
            loading: false,
        });
    }

    render() {
        const { user, loading } = this.state;
        if (loading) {
            return "Loading...";
        }

        return (
            <React.Fragment>
                <div id="order-title-container" className="order-item">
                    <h3 id="order-title">Order History</h3>
                </div>
                <div id="orders-container">
                    {user.orders.length
                        ? user.orders.map((order) => (
                              <AdminOrderItem {...order} key={order.id} />
                          ))
                        : "No Orders"}
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.singleUser,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (id) => dispatch(getSingleUser(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
