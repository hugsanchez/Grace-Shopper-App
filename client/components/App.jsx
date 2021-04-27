import React, { Component } from "react";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import Header from "./Header.jsx";
import Homepage from "./Homepage/Homepage.jsx";
import AllProducts from "./AllProducts.jsx";
import { SignUp } from "./Forms";
import SingleProduct from "./SingleProduct.jsx";
import Cart from "./Cart.jsx"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <main className="main-view">
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path='/cart' component={Cart}/>
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
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
