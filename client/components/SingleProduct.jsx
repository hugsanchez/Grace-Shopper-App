import React, { Component } from "react";

// React-Redux
import { connect } from "react-redux";

// Redux Imports
import { getSingleProduct } from "../store/actionCreators/singleProduct";
import store from "../store/store";

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleProduct: [],
            //reviews: []
        };
    }
    async componentDidMount() {
        const id = this.props.match.params.id * 1;
        await this.props.getSingleProduct(id);
        //await this.props.getReviewForProduct(id);
        await this.setState({ singleProduct: store.getState().singleProduct });
      //  await this.setState({reviews: store.getState().reviews})
    }

    render() {
        const {singleProduct} = this.state;
        const {reviews} = singleProduct;
        if(!reviews){
            return null
        }

        return (
            <div>
                <div>
                    <h1>{singleProduct.name}</h1>
                    <img src={singleProduct.imgUrl} width="450px" height="450px" />
                    <h3>Acquired On: {singleProduct.year}</h3>
                    <h3>Quantity Avaliable: {singleProduct.stock}</h3>
                    <h3>Price: ${singleProduct.price}</h3>
                    <p>Description: {singleProduct.description}</p>
                </div>

                <div>
                    <h2>Reviews:</h2>
                    {console.log(singleProduct)}
                    <ul>
                        {
                            reviews.length ? reviews.map((currReview, revIdx) => {
                                return(
                                    <div key={revIdx}>
                                    <div>
                                        <h4>{currReview.detail}</h4>
                                        <h3>Written By:{currReview.userId}</h3>

                                    </div>
                                    </div>
                                )
                            }) : 'Currently No Reviews'
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleProduct: (id) => dispatch(getSingleProduct(id)),
       // getReviewForProduct: (id) => dispatch(getReviewForProduct(id))
    };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
