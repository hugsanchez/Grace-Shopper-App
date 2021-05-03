import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import store from "../store/store";
import axios from "axios";

class TakeMoney extends React.Component {
  //   onToken = (token, address) => {
  //     // await axios.post("/save-stripe-token", { token });
  //     fetch("/save-stripe-token", {
  //       method: "POST",
  //       body: JSON.stringify(token),
  //     }).then((response) => {
  //       response.json().then((data) => {
  //         alert(`We are in business, ${data.email}`);
  //       });
  //     });
  //   };

  async handleToken(token, addresses) {
    const response = await axios.post("/checkout", { token });
    const { status } = response.data;
    if (status === "success") {
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
