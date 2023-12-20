import React, { Component } from "react";
import { PaymentElement, ElementsConsumer } from "@stripe/react-stripe-js";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements, amount} = this.props;    
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError);
      return;
    }

    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/paymentFrontSide", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });

      const ress = await response.json();
      const clientSecret = ress.clientSecret;
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
      });

      if (error) {
        // Handle payment confirmation error
        console.error(error);
      } else {
        // Payment succeeded, you can perform any additional actions here
        console.log("Payment succeeded");
      }
    } catch (error) {
      console.error("An error occurred during payment processing:", error);
    }
  };

  render() {
    const { stripe } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = (props) => (
  <ElementsConsumer>
    {({ stripe, elements, }) => (
      <CheckoutForm stripe={stripe} elements={elements} amount={props.amount}/>
    )}
  </ElementsConsumer>
);

export default InjectedCheckoutForm;
