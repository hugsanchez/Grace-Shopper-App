import React, { Component, useState } from "react";

// React-Redux Imports
import { connect } from "react-redux";

// Redux Imports
import {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/actionCreators/shoppingCart";
import TakeMoney from "./CheckoutWithStripe.jsx";

import store from "../store/store";

// React-Router Imports
import { Link } from "react-router-dom";

// Style Imports
import "../../public/assets/style.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      totalPrice: 0,
      productsInCart: [],
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  async componentDidMount() {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    const cartOnMount = await this.props.addItemToCart(null, userId);
    await this.setState({
      ...this.state,
      allProducts: store.getState().allProducts,
      productsInCart: this.props.cart,
    });
  }

  async addToCart(event) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.addItemToCart(event, userId);
    await this.setState({ ...this.state, productsInCart: this.props.cart });
  }

  async deleteFromCart(event) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.deleteFromCart(event, userId);
    await this.setState({ ...this.state, productsInCart: this.props.cart });
  }

  async incrementQuantity(event) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.incrementQuantity(event, userId);
    await this.setState({
      ...this.state,
      productsInCart: this.props.cart,
    });
  }

  async decrementQuantity(event) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.decrementQuantity(event, userId);
    await this.setState({
      ...this.state,
      productsInCart: this.props.cart,
    });
  }

  render() {
    const userStatus = store.getState().signedIn.isSignedIn;
    let displayCart = this.state.productsInCart[
      this.state.productsInCart.length - 1
    ];
    const totalPrice = this.state.totalPrice;
    const { filterProducts } = this.props;

    return (
      <div>
        <div id="cart-summary">
          <h2>Cart Summary</h2>
          <ul>
            {displayCart ? (
              displayCart.map((product, idx) => (
                <li key={idx}>
                  Name: {product.name} Quantity: {product.quantity}{" "}
                  <button
                    onClick={() => {
                      this.incrementQuantity(product);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      this.decrementQuantity(product);
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      this.deleteFromCart(product);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No Products In Cart</p>
            )}
          </ul>
          <h3>Total ${this.props.total}</h3>
          {userStatus ? (
            <TakeMoney />
          ) : (
            <a href="#/sign-in">
              <button>Proceed To Checkout</button>
            </a>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addItemToCart: (currProduct, userId) =>
      dispatch(addItemToCart(currProduct, userId)),
    deleteFromCart: (currProduct, userId) =>
      dispatch(removeFromCart(currProduct, userId)),
    incrementQuantity: (currProduct, userId) =>
      dispatch(increaseQuantity(currProduct, userId)),
    decrementQuantity: (currProduct, userId) =>
      dispatch(decreaseQuantity(currProduct, userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
