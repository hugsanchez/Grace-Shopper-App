import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";
import { getAllProducts } from "../../store/actionCreators/allProducts";

class AdminInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: [],
        };
    }

    async componentDidMount() {
        await this.props.loadAllProducts();
        this.setState({
            ...this.state,
            loading: false,
            products: this.props.allProducts,
        });
    }

    render() {
        const { loading, products } = this.state;
        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }
        return (
            <React.Fragment>
                <div className="product-tablebase"></div>
                {products.map((product) => (
                    <div key={product.id}>{product.name}</div>
                ))}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        allProducts: state.allProducts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAllProducts: () => dispatch(getAllProducts()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInventory);
