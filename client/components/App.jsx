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
      <div>
        <h1>Welcome to Black Market Art</h1>
        <AllProducts />
      </div>
    );
  }
}

export default App;
