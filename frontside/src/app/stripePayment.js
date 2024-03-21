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
      customAmount: parseFloat(this.props.plan),
      newAmount: parseFloat(this.props.totalAmount),
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

  calculateTotalAmount = () => {
    const vat = parseFloat(this.props.vat);
    const vatAmount = parseFloat(this.props.vatAmount);
    const totalAmount = parseFloat(this.props.totalAmount);
    this.setState({
      vatAmount: vatAmount,
      newAmount: totalAmount,
    });
  };
  render() {
    const { vat } = this.props;
    const shouldInitializeStripe = Boolean(this.state.totalAmount);
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
            <Trans>Amount</Trans>
          </label>
          <input
            id="customAmount"
            type="number"
            value={this.state.newAmount}
            disabled
            className="form-control"
          />
          {/* <div className="vatInfo">
            <div className="p-1">
              <Trans
                i18nKey="creditMessage"
                values={{
                  amount: CurrencyFormatter.formatCurrency(this.state.plan_amt),
                  totalAmount: CurrencyFormatter.formatCurrency(
                    this.props.totalAmount
                  ),
                  vatRate: vat,
                }}
              >
                Default content if translation is missing.
              </Trans>
            </div>
          </div> */}
        </div>
        {/* {shouldInitializeStripe && ( */}
        <Elements stripe={stripePromise} options={options}>
          <InjectedCheckoutForm
            amount={this.state.newAmount}
            plan_id={this.props.plan_id}
            plan_name={this.props.plan_name}
            plan_amt={this.props.plan_amt}
            history={this.props.history}
            originalAmount={this.props.plan_amt}
          />
        </Elements>
        {/* )} */}
      </>
    );
  }
}

export default StripePayment;
