import React, { Component, useState } from "react";

// React-Redux Imports
import { connect } from "react-redux";

// Redux Imports
import { getAllProducts } from "../store/actionCreators/allProducts";
import { addItemToCart } from "../store/actionCreators/shoppingCart";

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
    };
    this.addToCart = this.addToCart.bind(this);
  }


  async componentDidMount() {
    await this.props.getAllProducts();
    await this.setState({ allProducts: store.getState().allProducts });
  }

  async addToCart(event) {
    const userId = await store.getState().signedIn.user.id;
    await this.props.addItemToCart(event, userId);
    const currProduct = await store.getState().cart;
  }

  render() {
    const allProducts = this.state.allProducts;
    const totalPrice = this.state.totalPrice;
    const {filterProducts} = this.props;
    
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
            {this.props.cart.map((curr, idx) => {
              return (
                <li key={idx}>
                  {curr.name} Quantity {curr.quantity ? curr.quantity : 0}
                </li>
              );
            })}
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
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
