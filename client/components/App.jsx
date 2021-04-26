import React, { Component } from "react";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import Header from "./Header.jsx";
import Homepage from "./Homepage.jsx";
import AllProducts from "./AllProducts.jsx";

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
                            <Route
                                exact
                                path="/paintings"
                                component={AllProducts}
                            />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
