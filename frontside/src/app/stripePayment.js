import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Trans } from "react-i18next";
import InjectedCheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY,{
  locale: 'auto',
  hideCountry: true,
});


class StripePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customAmount: 10,
      paymentError: null,
    };
  }

  handleAmountChange = (event) => {
    this.setState({ customAmount: event.target.value });
  };

  render() {
    const options = {
      mode: "payment",
      amount: this.state.customAmount * 100,
      currency: "inr",
      payment_method_types: ["card"],
    };
    return (
      <>
        <div className="form-group">
          <label htmlFor="customAmount"><Trans>Enter Amount</Trans></label>
          <input
            id="customAmount"
            type="number"
            value={this.state.customAmount}
            onChange={this.handleAmountChange}
            placeholder="Enter amount"
            className="form-control"
          />
        </div>
        <Elements stripe={stripePromise} options={options}>
          <InjectedCheckoutForm amount={this.state.customAmount} history={this.props.history}/>
        </Elements>
      </>
    );
  }
}

export default StripePayment;
