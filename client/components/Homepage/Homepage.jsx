import React, { Component } from "react";

// Style Import
import "../../../public/assets/homepage.css";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="homepage-lander">
                <div id="slideshow-container"></div>
            </div>
        );
    }
}

export default Homepage;
