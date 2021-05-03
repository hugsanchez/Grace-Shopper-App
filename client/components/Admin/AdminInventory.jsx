import React, { Component } from "react";

// React Router Imports
import { NavLink } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import { getAllProducts } from "../../store/actionCreators/allProducts";
import { updateSingleProduct } from "../../store/actionCreators/singleProduct";

// Component Imports
import ProductDialogue from "./ProductDialogue.jsx";

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
            dialogueOpen.push(false);
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
        const newDialogueOpen = dialogueOpen.map((bool, idx) => {
            if (idx + 1 === id) {
                return true;
            } else {
                return false;
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
            dialogueOpen.push(false);
        }

        this.setState({
            ...this.state,
            dialogueOpen,
        });
    }

    handleSubmit(id, name, description, price, year, stock, imgUrl) {
        const { updateProduct } = this.props;

        updateUser({ id, name, description, price, year, stock, imgUrl });
        this.handleClose();
    }

    render() {
        const { loading, products, dialogueOpen } = this.state;

        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }
        return (
            <div className="primary-screen">
                <header className="user-header">
                    <div className="user-header-container">
                        <NavLink
                            to={`/admin/users`}
                            className="header-link-user"
                            name="users"
                        >
                            Users
                        </NavLink>
                    </div>
                    <div className="user-header-container">
                        <NavLink
                            to={`/admin/inventory`}
                            className="header-link-user"
                            name="inventory"
                        >
                            Inventory
                        </NavLink>
                    </div>
                </header>
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
                        {products.map((product) => (
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
                                            open={dialogueOpen[product.id - 1]}
                                            close={this.handleClose}
                                            submit={this.handleSubmit}
                                            {...product}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
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
        updateProduct: (product) => dispatch(updateSingleProduct(product)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInventory);
