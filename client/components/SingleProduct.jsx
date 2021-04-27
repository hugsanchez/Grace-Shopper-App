import React, { Component } from "react";

// React-Redux
import { connect } from "react-redux";

// Redux Imports
import { getSingleProduct } from "../store/actionCreators/singleProduct";
import store from "../store/store";

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleProduct: [],
        };
    }
    async componentDidMount() {
        const id = this.props.match.params.id * 1;
        await this.props.getSingleProduct(id);
        await this.setState({ singleProduct: store.getState().singleProduct });
    }

    render() {
        const singleProduct = this.state.singleProduct;

        return (
            <div>
                <h1>{singleProduct.name}</h1>
                <img src={singleProduct.imgUrl} width="450px" height="450px" />
                <h3>Acquired On: {singleProduct.year}</h3>
                <h3>Quantity Avaliable: {singleProduct.stock}</h3>
                <h3>Price: ${singleProduct.price}</h3>
                <p>Description: {singleProduct.description}</p>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleProduct: (id) => dispatch(getSingleProduct(id)),
    };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
