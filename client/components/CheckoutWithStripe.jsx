import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import store from "../store/store";
import axios from "axios";

// API {
//     products: [ { id: #, quantity: # }, { id: another #, quantity: # }, ...],
//     userId: #,
// }

class TakeMoney extends React.Component {
  constructor() {
    super();
    this.handleToken = this.handleToken.bind(this);
  }
  async handleToken(token, addresses) {
    console.log('check for cart',this.props.cart)
    const tokenToSend = { token, total: this.props.total, cart: this.props.cart[this.props.cart.length-1] };
    console.log(tokenToSend);
    // const userId = await store.getState().signedIn.user.id;
    // const products = this.props.cart[this.props.cart.length - 1].map((curr) => {
    //   return {
    //     id: curr.id,
    //     price: curr.price,
    //     quantity: curr.quantity,
    //   };
    // });
    // const createOrder = { products, userId };
    const response = await axios.post("/api/checkout", { tokenToSend });
    const { status } = response.data;
    if (status === "success") {
      //const newOrder = await axios.post("/api/orders", createOrder);
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  render() {
    const totalPrice = this.props.total;
    return (
      // ...
      <StripeCheckout
        token={this.handleToken}
        stripeKey="pk_test_51ImoMPDR0fOunmqd1floGlmv6CuKmfeOFFy9IXUUAijzk9ESftuvY0s0WPVH14WLmUoAFepbwOIHGf8P1GZhX7cg00E3K13wPG"
        billingAddress
        shippingAddress
        amount={totalPrice * 100}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps)(TakeMoney);
