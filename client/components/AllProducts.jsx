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
        };
        this.addToCart = this.addToCart.bind(this);
    }

    async componentDidMount() {
        await this.props.getAllProducts();
        // await console.log(store.getState());
        await this.setState({ allProducts: store.getState().allProducts });
    }

    async addToCart(currProductId) {
        await this.props.addItemToCart(currProductId);
        const currProduct = await store.getState();
        console.log("currProduct component", currProduct);
        await this.setState({
            ...this.state,
            cart: [...this.state.cart, currProduct],
        });
        await console.log(this.state.cart);
    }

    render() {
        const allProducts = this.state.allProducts;

        return (
            <div>
                <ul className="list-style">
                    {allProducts.map((product) => {
                        return (
                            <li key={product.id}>
                                Name:{" "}
                                <Link to={`/product/${product.id}`}>
                                    {product.name}
                                </Link>{" "}
                                --- Price: {product.price}
                                <button
                                    onClick={() => {
                                        this.addToCart(product.id);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div id="cart-summary">
                    <h2>Cart Summary</h2>
                    <ul></ul>
                    <h3>Total</h3>
                    <button>Proceed to Checkout</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(getAllProducts()),
        addItemToCart: (id) => dispatch(addItemToCart(id)),
    };
};

export default connect(null, mapDispatchToProps)(AllProducts);
