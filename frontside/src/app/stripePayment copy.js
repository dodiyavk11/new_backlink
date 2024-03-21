import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Trans } from "react-i18next";
import InjectedCheckoutForm from "./CheckoutForm";
import CurrencyFormatter from "./shared/CurrencyFormatter";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY, {
  locale: "auto",
  hideCountry: true,
});

class StripePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customAmount: 0,
      newAmount: 0,
      paymentError: null,
    };
  }

  handleAmountChange = (event) => {
    const customAmount = parseFloat(event.target.value);
    this.calculateTotalAmount(customAmount);
  };

  componentDidMount() {
    this.calculateTotalAmount();
  }

  calculateTotalAmount = (customAmount = this.state.customAmount) => {
    const vat = parseFloat(this.props.vat);
    const vatAmount = (customAmount * vat) / 100;
    const totalAmount = customAmount + vatAmount;

    this.setState({
      customAmount: customAmount,
      newAmount: totalAmount,
    });
  };

  render() {
    const { vat } = this.props;
    const shouldInitializeStripe = Boolean(this.state.customAmount);
    const options = {
      mode: "payment",
      amount: Math.round(this.state.newAmount * 100),
      currency: "inr",
      payment_method_types: ["card"],
    };
    return (
      <>
        <div className="form-group">
          <label htmlFor="customAmount">
            <Trans>Enter Amount</Trans>
          </label>
          <input
            id="customAmount"
            type="number"
            value={this.state.customAmount}
            onChange={this.handleAmountChange}
            placeholder="Enter amount"
            className="form-control"
          />
          <div className="vatInfo">
            <div className="p-1">
              {/* You will be credited{" "}
              {CurrencyFormatter.formatCurrency(this.state.customAmount)}. The
              total amount payable of{" "}
              {CurrencyFormatter.formatCurrency(this.state.newAmount)} includes
              applicable VAT in the amount of {vat}%. */}
              <Trans
                i18nKey="creditMessage"
                values={{
                  amount: CurrencyFormatter.formatCurrency(
                    this.state.customAmount
                  ),
                  totalAmount: CurrencyFormatter.formatCurrency(
                    this.state.newAmount
                  ),
                  vatRate: vat,
                }}
              >
                Default content if translation is missing.
              </Trans>
            </div>
          </div>
        </div>
        {shouldInitializeStripe && (
          <Elements stripe={stripePromise} options={options}>
            <InjectedCheckoutForm
              amount={this.state.newAmount}
              history={this.props.history}
              originalAmount={this.state.customAmount}
            />
          </Elements>
        )}
      </>
    );
  }
}

export default StripePayment;
