import React, { Component } from "react";

class CarouselImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { src } = this.props;
        return (
            <article className="carousel-article">
                <img src={`/images/artwork/${src}`} alt="" />
            </article>
        );
    }
}

export default CarouselImage;
