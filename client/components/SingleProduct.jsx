import React, {Component} from "react";
import {connect} from "react-redux";
import {getSingleProduct} from "../actionCreators/singleProduct";
import store from "../store/store";


class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleProduct: [],
        };
    }
    async componentDidMount() {
        await this.props.getSingleProduct();
        await this.setState({ singleProduct: store.getState().singleProduct});
    }

    render(){
        const singleProduct = this.state.singleProduct;

        return(
            <div>
                <h1>{singleProduct.name}</h1>
                <img src={singleProduct.imgUrl} width="150px" height="150px"/>
                <h3>Year: {singleProduct.year}</h3>
                <h3>Quantity Avaliable: {singleProduct.stock}</h3>
                <h3>Price: {singleProduct.price}</h3>
                <p>Description: {singleProduct.description}</p>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleProduct: () => dispatch(getSingleProduct()),
    };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
