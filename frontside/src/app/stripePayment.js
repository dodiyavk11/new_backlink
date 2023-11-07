import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51NsHj9SC7x5vD10MwSXcqvZoKpQxEOa2VuUNxCB0MfWKHd0oFMY4bEZAAulbIE23yP4Dk4fF0reCMQlfAh2ANsio00QXxoDW3d"
);

class StripePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customAmount: 0,
      paymentError: null,
    };
  }

  handleAmountChange = (event) => {
    this.setState({ customAmount: event.target.value });
  };

  handleSubmit = async () => {
    if (isNaN(this.state.customAmount) || this.state.customAmount <= 0) {
      this.setState({
        paymentError: "Invalid amount. Please enter a valid amount.",
      });
      return;
    }
    this.setState({ paymentError: null });
    try {
      const response = await fetch("http://localhost:3000/paymentFrontSide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE2OTkyNjY1NzcsImV4cCI6MTY5OTMwMjU3N30.RRY-ZbWKPVFYhhWOvEWWp-omhqtdV5s3H8giU9MsNnY",
        },
        body: JSON.stringify({ amount: this.state.customAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent.");
      } else {
      }

      const clientSecret = await response.text();
      const { stripe, elements } = this.props;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement("card"),
        },
      });

      if (result.error) {
        this.setState({ paymentError: result.error.message });
      } else {
        console.log("Payment succeeded:", result.paymentIntent);
      }
    } catch (error) {
      this.setState({
        paymentError: "An error occurred while processing your payment.",
      });
    }
  };

  render() {
    return (
      <Elements stripe={stripePromise}>
        <div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Amount</label>
            <input
              value={this.state.customAmount}
              onChange={this.handleAmountChange}
              placeholder="Enter amount"
              type="number"
              className="form-control form-control"
            />
          </div>
          <button
            className="btn btn-gradient-primary btn-rounded btn-fw btn-block"
            onClick={this.handleSubmit}
          >
            Pay
          </button>
        </div>
        {this.state.paymentError && (
          <div className="error-message text-danger mt-2">
            {this.state.paymentError}
          </div>
        )}
      </Elements>
    );
  }
}

export default StripePayment;
