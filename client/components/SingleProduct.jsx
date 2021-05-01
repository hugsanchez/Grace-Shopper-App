import React, { Component } from "react";

// React-Redux
import { connect } from "react-redux";

// Redux Imports
import { getSingleProduct } from "../store/actionCreators/singleProduct";
import EditProduct from "./EditProduct.jsx";
import store from "../store/store";
import ReviewForm from "./Review/FormReview.jsx";
import ReviewsPerProduct from './Review/ReviewsProduct.jsx';
import {Link} from 'react-router-dom';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editToggle: false,
    };
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }
  async componentDidMount() {
    const id = this.props.match.params.id * 1;
    await this.props.getSingleProduct(id);
    //await this.props.getReviewForProduct(id);
    await this.setState({ loading: false });
    //  await this.setState({reviews: store.getState().reviews})
  }

  async handleEditToggle() {
    if (this.state.editToggle === false) {
      this.setState({ editToggle: true });
    } else if (this.state.editToggle === true) {
      this.setState({ editToggle: false });
    }
  }

  render() {
    const { loading, editToggle } = this.state;
    if (loading) return "loading";
    const { singleProduct } = this.props;
    const {isSignedIn} = this.props.signedIn;
    const {user} = this.props.signedIn;

    // if(!user.id){
    //   return null
    // }

    return (
      <div>
        <div>
            <button onClick={this.handleEditToggle}>Edit</button>
            {editToggle === false ? null : <EditProduct props={singleProduct} />}
            <h1>{singleProduct.name}</h1>
            <img src={singleProduct.imgUrl} width="450px" height="450px" />
            <h3>Acquired On: {singleProduct.year}</h3>
            <h3>Quantity Avaliable: {singleProduct.stock}</h3>
            <h3>Price: ${singleProduct.price}</h3>
            <p>Description: {singleProduct.description}</p>
        </div>
            {
              isSignedIn ?  <ReviewForm singleProductId = {singleProduct.id} userId = {user.id} /> : 
                        <h3>Wanna leave a <Link to='/sign-up'>Review?</Link></h3>

            }
        <div>
            <h1>Reviews:</h1>
            <ReviewsPerProduct singleProductId = {singleProduct.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleProduct: state.singleProduct,
    signedIn: state.signedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(getSingleProduct(id)),
    // getReviewForProduct: (id) => dispatch(getReviewForProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
