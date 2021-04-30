import React, { Component } from "react";

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
    // await console.log(store.getState());
    await this.setState({ allProducts: store.getState().allProducts });
  }

  async addToCart(event) {
    await this.props.addItemToCart(event.id);
    const currProduct = await store.getState().cart;
    //Tracking total for our cart
    let tempPrice = 0;
    currProduct.cart.map((product) => {
      tempPrice += product.price;
      this.setState({ totalPrice: tempPrice });
    });
    // // let cartArr= this.state.cart
    // if(this.state.cart.length===0){
    //     currProduct.quantity=1
    //     await this.setState({
    //         ...this.state,
    //         cart: [...this.state.cart, currProduct],
    //     });
    // }else{
    //     for(let val of this.state.cart){
    //         // console.log('val && curr product',val, currProduct)
    //         if(val.item.id===currProduct.item.id){
    //             val.quantity++
    //             return
    //         }

    //     }
    //     await this.setState({
    //         ...this.state,
    //         cart: [...this.state.cart, currProduct],
    //     });

    // }
    // await this.setState({
    //     ...this.state,
    //     cart: [...this.state.cart, currProduct],
    // });
    // await console.log('cart cart',this.state.cart);
  }

  render() {
    const allProducts = this.state.allProducts;
    const totalPrice = this.state.totalPrice;

    return (
      <div>
        <div id="allProductsPage">
          <ul className="list-style" id="storePage">
            {allProducts.map((product) => {
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
              return <li key={idx}>{curr.name}</li>;
            })}
          </ul>
          <h3>Total: {totalPrice}</h3>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addItemToCart: (currProductId) => dispatch(addItemToCart(currProductId)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
