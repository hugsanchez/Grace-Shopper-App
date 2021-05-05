import React, { Component, useState } from "react";
import Select from "react-select";

// React-Redux Imports
import { connect } from "react-redux";

// Redux Imports
import { getAllProducts } from "../store/actionCreators/allProducts";
import {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/actionCreators/shoppingCart";

import store from "../store/store";

// React-Router Imports
import { Link } from "react-router-dom";

// Style Imports
import "../../public/assets/style.css";

const Categories = [
  { label: "Classical", value: "Classical" },
  { label: "Post-Impressionism", value: "Post-Impressionism" },
  { label: "Neo-Impressionism", value: "Neo-Impressionism" },
  { label: "Divisionism", value: "Divisionism" },
  { label: "Cubism", value: "Cubism" },
  { label: "Expressionism", value: "Expressionism" },
];

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      cart: [],
      totalPrice: 0,
      productsInCart: [],
      category: "",
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  async componentDidMount() {
    let userId;
    (await store.getState().signedIn.isSignedIn) === false
      ? (userId = 0)
      : (userId = await store.getState().signedIn.user.id);
    await this.props.getAllProducts();
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

  async setCategory(category) {
    this.setState({ category: category });
  }

  render() {
    const userStatus = store.getState().signedIn.isSignedIn;
    const allProducts = this.state.allProducts;
    const categories = this.state.category;
    let displayCart = this.state.productsInCart[
      this.state.productsInCart.length - 1
    ];
    const totalPrice = this.state.totalPrice;
    const { filterProducts } = this.props;

    return (
      <div>
        <div id="categories">
          <Select
            options={Categories}
            onChange={(options) => {
              this.setCategory(options.value);
            }}
          />
        </div>
        {categories === "" ? (
          <div id="allProductsPage">
            <p className="list-style" id="storePage">
              {filterProducts.map((product) => {
                return (
                  <li key={product.id} id="listOfAllProducts">
                    <img
                      src={product.imgUrl}
                      width="150"
                      height="150"
                      id="productImg"
                    />
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
            </p>
          </div>
        ) : (
          <div id="allProductsPage">
            <ul className="list-style" id="storePage">
              {filterProducts.map((product) => {
                return product.categories.map((category) => {
                  if (category.name === categories) {
                    return (
                      <li key={product.id} id="listOfAllProducts">
                        <img
                          src={product.imgUrl}
                          width="150"
                          height="150"
                          id="productImg"
                        />
                        <br />
                        Name:{" "}
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
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
                  }
                });
              })}
            </ul>
          </div>
        )}
        <div id="cart-summary">
          <h2 class="cartTitle">
            <strong>Cart Summary</strong>
          </h2>
          <ul>
            {displayCart ? (
              displayCart.map((product, idx) => (
                <li key={idx} class="cartList">
                  <strong>Name:</strong> {product.name}{" "}
                  <strong>Quantity:</strong> {product.quantity}{" "}
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
          <a href="#/cart">
            <button>Proceed To Checkout</button>
          </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
