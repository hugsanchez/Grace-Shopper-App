import React, { Component } from "react";
import AllProducts from "./AllProducts.jsx";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

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
                            <Route exact path="/" component={AllProducts} />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
