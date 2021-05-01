import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const ReviewsPerProduct = ({currReview}) => {
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
          <h3>{currReview.detail}</h3>
          <h4>Written By: {user.username}</h4>
        </div>
    )
}

const mapStateToProps = (state,otherProps) => {
    return{
        state,
        otherProps,
    }
}

export default connect(mapStateToProps, null)(ReviewsPerProduct);