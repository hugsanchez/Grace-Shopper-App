import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReviewsPerProduct from './ReviewsProduct.jsx'
import {Link} from 'react-router-dom';

class ReviewForm extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
    }
    render(){
        const {singleProductId} = this.props;
        return(
            <div>
                <h1>REVIEW FORM</h1>
                <h2>Wanna leave a <Link to='/sign-up'>Review?</Link></h2>
                <ReviewsPerProduct singleProductId={singleProductId}/>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return{
        
//     }
// }

export default connect()(ReviewForm);