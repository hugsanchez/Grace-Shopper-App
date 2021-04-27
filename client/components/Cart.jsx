import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../actionCreators/allProducts";
import store from "../store/store";
import { Link } from "react-router-dom";
import "../../public/assets/style.css";

class Cart extends Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <h1>Cart</h1>
            </div>
        )
    }
}

export default Cart