import React, { Component } from "react";

// Style Import
import "../../../public/assets/homepage.css";

// Data Imports
import CAROUSEL_DATA from "./carouselImageData";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="homepage-lander">
        <img
          id="homegif"
          src="https://media.giphy.com/media/M52wyuahvQfJK/giphy.gif"
          alt="art gif"
          //   width="500"
          //   height="600"
        />
        {/* <div id="slideshow-container">
                    {CAROUSEL_DATA.map((article) => (
                        <CarouselImage {...article} key={article.src} />
                    ))}
                </div> */}
      </div>
    );
  }
}

export default Homepage;
