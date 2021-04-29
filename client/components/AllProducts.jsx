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

    async addToCart(event) {
        // console.log(event)
        // console.log('props',this.props)
        await this.props.addItemToCart(event.id);
        const currProduct = await store.getState().cart;
        console.log("currProduct component", currProduct);
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
                                        this.addToCart(product);
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
                    <ul>
                        {this.props.cart.map((curr)=>{
                            console.log('currr',curr)
                            return <li>{curr.name}</li>
                        })}
                    </ul>
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
        addItemToCart: (currProductId) => dispatch(addItemToCart(currProductId)),
    };
};

const mapStateToProps= (state)=>{
    return{
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
