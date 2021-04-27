import React, { Component } from "react";

// React-Redux Imports
import { connect } from "react-redux";

// Redux Imports
import { getAllProducts } from "../store/actionCreators/allProducts";
import store from "../store/store";

// React-Router Imports
import { Link } from "react-router-dom";

// Style Imports
import "../../public/assets/style.css";

class Cart extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Cart</h1>
            </div>
        );
    }
}

export default Cart;
