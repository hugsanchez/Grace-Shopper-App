import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";
import { attemptTokenLogin } from "../store/actionCreators/singleUser";
import { getAllProducts } from "../store/actionCreators/allProducts";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import Header from "./Header.jsx";
import Homepage from "./Homepage/Homepage.jsx";
import AllProducts from "./AllProducts.jsx";
import { SignUp, SignIn } from "./Forms";
import SingleProduct from "./SingleProduct.jsx";
import SingleUser from "./SingleUser.jsx";
import Cart from "./Cart.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        // Search for a token in localStorage so users will stay signed in on refresh
        await this.props.attemptLogin();
        await this.props.allProducts();
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <main className="main-view">
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/cart" component={Cart} />
                            <Route
                                exact
                                path="/store"
                                component={AllProducts}
                            />
                            <Route
                                exact
                                path="/product/:id"
                                component={SingleProduct}
                            />
                            <Route exact path="/sign-up" component={SignUp} />
                            <Route exact path="/sign-in" component={SignIn} />
                            <Route
                                exact
                                path="/user/:id"
                                component={SingleUser}
                            />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        attemptLogin: () => dispatch(attemptTokenLogin()),
        allProducts: () => dispatch(getAllProducts()),
    };
}

export default connect(null, mapDispatchToProps)(App);
