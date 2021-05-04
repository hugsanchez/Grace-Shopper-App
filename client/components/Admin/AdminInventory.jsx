import React, { Component } from "react";

// React Router Imports
import { NavLink } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import { getAllProducts } from "../../store/actionCreators/allProducts";
import { updateProduct_adminAccess } from "../../store/actionCreators/singleProduct";

// Component Imports
import ProductDialogue from "./dialogs/ProductDialogue.jsx";

class AdminInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: [],
            dialogueOpen: [],
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await this.props.loadAllProducts();
        const { allProducts } = this.props;

        let dialogueOpen = [];
        for (let i = 0; i < allProducts.length; i++) {
            dialogueOpen.push({ active: false, productId: allProducts[i].id });
        }

        this.setState({
            ...this.state,
            loading: false,
            products: allProducts.sort((a, b) => a.id - b.id),
            dialogueOpen,
        });
    }

    handleOpen(id) {
        const { dialogueOpen } = this.state;
        const newDialogueOpen = dialogueOpen.map((obj) => {
            if (obj.productId === id) {
                return { active: true, productId: obj.productId };
            } else {
                return { active: false, productId: obj.productId };
            }
        });

        this.setState({
            ...this.state,
            dialogueOpen: newDialogueOpen,
        });
    }

    handleClose() {
        const { products } = this.state;
        let dialogueOpen = [];
        for (let i = 0; i < products.length; i++) {
            dialogueOpen.push({ active: false, productId: products[i].id });
        }

        this.setState({
            ...this.state,
            dialogueOpen,
        });
    }

    async handleSubmit(id, name, description, price, year, stock, imgUrl) {
        const { updateProduct } = this.props;

        await updateProduct({
            id,
            name,
            description,
            price,
            year,
            stock,
            imgUrl,
        });

        const { allProducts } = this.props;

        this.setState({
            ...this.state,
            products: allProducts.sort((a, b) => a.id - b.id),
        });

        this.handleClose();
    }

    render() {
        const { loading, products, dialogueOpen } = this.state;

        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }
        return (
            <div id="admin-view">
                <div id="order-title-container" className="order-item">
                    <h3 id="order-title">Inventory</h3>
                </div>
                <table id="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image Preview</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Year</th>
                            <th>Stock</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {products.map((product) => {
                        const dialog = dialogueOpen.filter(
                            (obj) => obj.productId === product.id,
                        )[0].active;
                        return (
                            <tbody key={product.id}>
                                <tr>
                                    <td>{product.id}</td>
                                    <td>
                                        <NavLink to={`/product/${product.id}`}>
                                            <img
                                                className="product-img"
                                                src={`${product.imgUrl}`}
                                            ></img>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <NavLink
                                            className="product-link-admin"
                                            to={`/product/${product.id}`}
                                        >
                                            {product.name}
                                        </NavLink>
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.year.substring(0, 4)}</td>
                                    <td>{product.stock}</td>
                                    <td className="img-container">
                                        <img
                                            className="edit-img"
                                            src="/images/utils/editUser.png"
                                            alt=""
                                            onClick={() =>
                                                this.handleOpen(product.id)
                                            }
                                        />
                                        <ProductDialogue
                                            open={dialog}
                                            close={this.handleClose}
                                            submit={this.handleSubmit}
                                            {...product}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
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
        updateProduct: (product) =>
            dispatch(updateProduct_adminAccess(product)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInventory);
