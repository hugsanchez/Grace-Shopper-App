import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../actionCreators/allProducts";
import store from "../store/store";
import "../../public/assets/style.css";

class AllProducts extends Component {
    constructor() {
        super();
        this.state = {
            allProducts: [],
        };
    }

    async componentDidMount() {
        await this.props.getAllProducts();
        await console.log(store.getState());
        await this.setState({ allProducts: store.getState().allProducts });
    }

    render() {
        const allProducts = this.state.allProducts;
        return (
            <div>
                <ul className="list-style">
                    {allProducts.map((product) => {
                        return (
                            <li key={product.id}>
                                Name: {product.name} --- Price: {product.price}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(getAllProducts()),
    };
};

export default connect(null, mapDispatchToProps)(AllProducts);
