import React, { Component, useState } from "react";

// React-Redux Imports
import { connect } from "react-redux";

// Redux Imports
import { getAllProducts } from "../store/actionCreators/allProducts";
import {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
} from "../store/actionCreators/shoppingCart";

import store from "../store/store";

// React-Router Imports
import { Link } from "react-router-dom";

// Style Imports
import "../../public/assets/style.css";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      cart: [],
      totalPrice: 0,
      productsInCart: [],
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
  }

  async componentDidMount() {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.getAllProducts();
    const cartOnMount = await this.props.addItemToCart(null, userId);
    console.log("cart on mount", cartOnMount);
    console.log("store get state", store.getState());
    // console.log('products in cart', this.props.cart)
    await this.setState({
      ...this.state,
      allProducts: store.getState().allProducts,
      productsInCart: this.props.cart,
    });
    console.log(
      "ProductsInCart During Component Did Mount",
      this.state.productsInCart
    );
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
    console.log("ProductsInCart After Increment", this.state.productsInCart);
  }

  render() {
    const allProducts = this.state.allProducts;
    console.log("PRODUCTSINCART", this.state.productsInCart);
    let displayCart = this.state.productsInCart[
      this.state.productsInCart.length - 1
    ];
    console.log("DISPLAYCART", displayCart);
    const totalPrice = this.state.totalPrice;
    const { filterProducts } = this.props;

    return (
      <div>
        <div id="allProductsPage">
          <ul className="list-style" id="storePage">
            {filterProducts.map((product) => {
              return (
                <li key={product.id} id="listOfAllProducts">
                  <img src={product.imgUrl} width="150" height="150" />
                  <br />
                  Name:{" "}
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                  <br />
                  Price: {product.price}
                  <br />
                  <button
                    onClick={() => {
                      this.addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
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
          <button>Proceed to Checkout</button>
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
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
