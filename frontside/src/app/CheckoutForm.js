import React, { Component } from "react";
import { PaymentElement, ElementsConsumer } from "@stripe/react-stripe-js";
import apiService from "./services/api.service";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Trans } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import CurrencyFormatter from "./shared/CurrencyFormatter";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      success: false,
      fail: false,
      errorSave: "",
      loading: false,
    };
  }
  handleClose = () => {
    this.setState({ modalShow: false });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      stripe,
      elements,
      amount,
      history,
      originalAmount,
      plan_id,
      plan_name,
      plan_amt,
    } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message, {
        position: "top-center",
        autoClose: 1500,
      });
      // console.error(submitError);
      return;
    }
    this.setState({ loading: true });
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}plan-payment-init`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            originalAmount: originalAmount,
            plan_id: plan_id,
            plan_name: plan_name,
          }),
        }
      );

      const result = await response.json();
      const clientSecret = result.clientSecret;
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error("Payment error", {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        const paymentId = paymentIntent.id;
        const paymentData = {
          amount: originalAmount,
          paymentData: paymentIntent,
          plan_id: plan_id,
          plan_name: plan_name,
        };
        apiService
          .sendPaymentResponse(paymentId, paymentData)
          .then((res) => {
            history.push(`/payment-success`);
          })
          .catch((error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.setState({ errorSave: resMessage });
            toast.error(resMessage, {
              position: "top-center",
              autoClose: 1500,
            });
          });
      }
    } catch (error) {
      toast.error("An error occurred during payment processing", {
        position: "top-center",
        autoClose: 1500,
      });
      console.error("An error occurred during payment processing:", error);
    }
  };

  render() {
    const { stripe, amount } = this.props;
    const { loading } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <PaymentElement />
          <button
            type="submit"
            className="btn btn-rounded btn-fw btn-block mt-3"
            disabled={!stripe || loading}
          >
            {loading && stripe ? (
              <Trans>Processing, please wait</Trans>
            ) : (
              <Trans>Pay {CurrencyFormatter.formatCurrency(amount)}</Trans>
            )}
          </button>
        </form>
      </>
    );
  }
}

const InjectedCheckoutForm = (props) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm
        stripe={stripe}
        elements={elements}
        amount={props.amount}
        originalAmount={props.originalAmount}
        history={props.history}
        plan_id={props.plan_id}
        plan_name={props.plan_name}
        plan_amt={props.plan_amt}
      />
    )}
  </ElementsConsumer>
);

export default withRouter(InjectedCheckoutForm);
