import React, { Component } from "react";

// React-Redux
import { connect } from "react-redux";

// Redux Imports
import { getSingleProduct } from "../store/actionCreators/singleProduct";
import EditProduct from "./EditProduct.jsx";
import store from "../store/store";
import ReviewForm from "./Review/FormReview.jsx";
import ReviewsPerProduct from './Review/ReviewsProduct.jsx';
import {Link} from 'react-router-dom';

import {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/actionCreators/shoppingCart";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editToggle: false,
      cart: [],
      totalPrice: 0,
      productsInCart: [],
    };
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }
  async componentDidMount() {
    const id = this.props.match.params.id * 1;
    await this.props.getSingleProduct(id);
    //await this.props.getReviewForProduct(id);
    await this.setState({ loading: false });
    //  await this.setState({reviews: store.getState().reviews})
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

  async handleEditToggle() {
    if (this.state.editToggle === false) {
      this.setState({ editToggle: true });
    } else if (this.state.editToggle === true) {
      this.setState({ editToggle: false });
    }
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
    const { loading, editToggle } = this.state;
    if (loading) return "loading";
    const { singleProduct } = this.props;
    const {isSignedIn} = this.props.signedIn;
    const {user} = this.props.signedIn;

    let displayCart = this.state.productsInCart[
      this.state.productsInCart.length - 1
    ];

    return (
      <div>
        <div>
            <button onClick={this.handleEditToggle}>Edit</button>
            {editToggle === false ? null : <EditProduct props={singleProduct} />}
            <h1>{singleProduct.name}</h1>
            <img src={singleProduct.imgUrl} width="450px" height="450px" />
            <h3>Acquired On: {singleProduct.year}</h3>
            <h3>Quantity Avaliable: {singleProduct.stock}</h3>
            <h3>Price: ${singleProduct.price}</h3>
            <p>Description: {singleProduct.description}</p>
            <h4>Categories: {singleProduct.categories.map((currCat) => {
              return (
                <div key ={currCat.id}>
                  <h2 >{currCat.name}</h2>
                </div>
              )
            })}</h4>
            <button
                    onClick={() => {
                      this.addToCart(singleProduct);
                    }}
                  >
                    Add to Cart
                  </button>
        </div>
            {
              isSignedIn ?  <ReviewForm singleProductId = {singleProduct.id} userId = {user.id} /> : 
                        <h3>Wanna leave a <Link to='/sign-up'>Review?</Link></h3>

            }
        <div>
            <h1>Reviews:</h1>
            <ReviewsPerProduct singleProductId = {singleProduct.id} />
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
          <button>Proceed to Checkout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleProduct: state.singleProduct,
    signedIn: state.signedIn,
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(getSingleProduct(id)),
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
