import React, { Component, useState } from "react";
import axios from "axios";

// React-Redux Imports
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

// Redux Imports
import {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} from "../store/actionCreators/shoppingCart";
// import TakeMoney from "./CheckoutWithStripe.jsx";
import { getAllProducts } from "../store/actionCreators/allProducts";

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
    this.handleToken = this.handleToken.bind(this);
  }

  async componentDidMount() {
    let userId;
    await this.props.getAllProducts();
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 1)
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
      ? (userId = 1)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.addItemToCart(event, userId);
    await this.setState({ ...this.state, productsInCart: this.props.cart });
  }

  async deleteFromCart(event) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 1)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.deleteFromCart(event, userId);
    await this.setState({ ...this.state, productsInCart: this.props.cart });
  }

  async incrementQuantity(event) {
    let currStock = 0;
    this.state.allProducts.map((product) => {
      if (product.name === event.name) {
        currStock = product.stock;
      }
    });
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 1)
      : (userId = await store.getState().signedIn.user.id);
    if (event.quantity < currStock) {
      await this.props.incrementQuantity(event, userId);
      await this.setState({
        ...this.state,
        productsInCart: this.props.cart,
      });
    }
  }

  async decrementQuantity(event) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 1)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.decrementQuantity(event, userId);
    await this.setState({
      ...this.state,
      productsInCart: this.props.cart,
    });
  }

  // API {
  //     products: [ { id: #, quantity: # }, { id: another #, quantity: # }, ...],
  //     userId: #,
  // }

  async handleToken(token, addresses) {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 1)
      : (userId = await store.getState().signedIn.user.id);
    const tokenToSend = {
      token,
      total: this.props.total,
      cart: this.props.cart[this.props.cart.length - 1],
    };
    let cart = await this.props.cart[this.props.cart.length - 1];
    const createOrder = {
      products: cart,
      userId: userId,
    };
    const response = await axios.post("/api/checkout", { tokenToSend });
    const { status } = response.data;
    if (status === "success") {
      await axios.post("/api/orders", createOrder);
      await this.props.emptyCart();
      await this.setState({ ...this.state, productsInCart: [] });
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  render() {
    const userStatus = store.getState().signedIn.isSignedIn;
    let displayCart = this.state.productsInCart[
      this.state.productsInCart.length - 1
    ];
    const totalPrice = this.state.totalPrice;
    const { filterProducts } = this.props;
    const productsInCart = this.state.productsInCart;

    return (
      <div>
        {productsInCart.length >= 1 ? (
          <div id="cart-summary">
            <h2 className="cartTitle">
              <strong>Cart Summary</strong>
            </h2>
            <ul>
              {displayCart ? (
                displayCart.map((product, idx) => (
                  <li key={idx} className="cartList">
                    <strong>Name:</strong> {product.name}{" "}
                    <strong>Quantity:</strong> {product.quantity}{" "}
                    <button
                      onClick={() => {
                        this.incrementQuantity(product);
                      }}
                    >
                      +
                    </button>
                    {product.quantity > 0 ? (
                      <button
                        onClick={() => {
                          this.decrementQuantity(product);
                        }}
                      >
                        -
                      </button>
                    ) : (
                      <button>-</button>
                    )}
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
            <StripeCheckout
              token={this.handleToken}
              stripeKey="pk_test_51ImoMPDR0fOunmqd1floGlmv6CuKmfeOFFy9IXUUAijzk9ESftuvY0s0WPVH14WLmUoAFepbwOIHGf8P1GZhX7cg00E3K13wPG"
              billingAddress
              shippingAddress
              amount={totalPrice * 100}
            />
          </div>
        ) : (
          <div>
            <h2 className="cartTitle">
              <strong>Order Complete</strong>
            </h2>
            <ul>
              {this.props.cart.map((product) => {
                <li>{product.name}</li>;
              })}
            </ul>
          </div>
        )}
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
    emptyCart: () => dispatch(emptyCart()),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
