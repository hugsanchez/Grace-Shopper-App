import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';

const SingleReview = ({currReview, otherProps}) => {
    const [user, setUsers] = useState([]);

    useEffect(() => {
      const getUsers = async() => {
        const {data:user} = await axios.get(`/api/users/${currReview.userId}`);
        setUsers(user);
      }
      getUsers();
    },[]);

    return(
        <div>
            {console.log(currReview)}
            <h3>{currReview.detail}</h3>
            <h5>Written By: {user.username}</h5>
            <div>
                <StarRatingComponent 
                    name='rating'
                    value={currReview.rating}
                    editing = {false}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state,otherProps) => {
  return {
    state,
    otherProps
  }
}

export default connect(mapStateToProps)(SingleReview);