import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "../../assets/custom.css";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../shared/CartItem";
import { Trans } from "react-i18next";
import CurrencyFormatter from "./CurrencyFormatter";
import AdminBack from "./AdminBack";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      userData: [],
      placeOrdersData: [],
    };
  }

  customizeData = () => {
    this.props.getCartData();
    const cartItems = this.props.cartData.map((item) => item.cartItems);
    this.setState({ cartItems });
  };

  getUserCartData = () => {
    ApiServices.getUserCartData()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          // this.setState({ cartItems: res.data.data });
          const cartItems = res.data.data.map((item) => item.cartItems);
          this.setState({ cartItems });
        }
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          this.props.history.push("/login");
        } else {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
  };
  componentDidMount() {
    this.getUserCartData();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.setState({ userData: userData });
    }
  }
  calculateTotal = () => {
    const { cartItems } = this.state;
    const total = cartItems.reduce(
      (acc, item) => acc + Number(item.total_price),
      0
    );
    return total.toFixed(2);
  };

  updateCartItem = (itemId, updatedItem) => {
    this.setState((prevState) => ({
      cartItems: prevState.cartItems.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      ),
    }));
  };
  handleSubmit = () => {
    const { cartItems } = this.state;
    ApiServices.cartPlaceOrder(cartItems).then(
      (res) => {
        if (res.data.status) {
          this.getUserCartData();
          this.props.getCartData();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
          this.setState({
            placeOrdersData: res.data.data,
          });
        }
      },
      (error) => {
        if (error.response && error.response.data) {
          const responseData = error.response.data;

          if (responseData.status === false && responseData.error) {
            const validationError = responseData.error;
            if (Array.isArray(validationError)) {
              const firstError = validationError[0];
              const errorMessage = firstError.message;
              toast.error(errorMessage, {
                position: "top-center",
                autoClose: 2000,
              });
            } else if (typeof validationError === "string") {
              toast.error(validationError, {
                position: "top-center",
                autoClose: 2000,
              });
            }
          } else {
            const resMessage =
              responseData.message ||
              responseData.error ||
              error.message ||
              error.toString();

            toast.error(resMessage, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } else {
          const resMessage = error.message || error.toString();
          toast.error(resMessage, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    );
  };
  deleteCartItem = (cartId) => {
    ApiServices.deleteItemFromCart(cartId).then(
      (res) => {
        if (res.data.status) {
          this.props.updateCartLength(res.data.data.length);
          this.props.getCartData();
          this.getUserCartData();
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        // alert(resMessage);
      }
    );
  };
  render() {
    const { cartItems, placeOrdersData, userData } = this.state;
    const total = this.calculateTotal();
    return (
      <div className="CartPage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">
            <Trans>Cart</Trans> <AdminBack/>
          </h3>
        </div>
        <ToastContainer />
        {cartItems.length > 0 ? (
          <div className="row">
            <div className="col-lg-8 grid-margin">
              {cartItems.map((item, index) => (
                <div className="card mb-4 bRadius" key={index}>
                  <div className="card-body dashboardCard">
                    <CartItem
                      key={item.id}
                      sr={index}
                      item={item}
                      updateCartItem={this.updateCartItem}
                      deleteCartItem={this.deleteCartItem}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4 grid-margin pl-1">
              <div className="card">
                <div className="card-body p-4">
                  <h4 className="card-title">
                    <Trans>Summary</Trans>
                  </h4>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.domain_name}
                              {item.textCreation === "Editorial" &&
                              item.wordCount !== "" ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    <Trans>Text</Trans> - {item.wordCount}{" "}
                                    <Trans>Words</Trans>
                                  </span>
                                </div>
                              ) : null}
                              {item.approveText ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    <Trans>
                                      Approve text before publication
                                    </Trans>
                                  </span>
                                </div>
                              ) : null}
                            </td>
                            <td className="text-end-ct">
                              <b>{CurrencyFormatter.formatCurrency(item.total_price)}</b>
                              {item.textCreation !== "Own" ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    {item.textCreationPrice ? (
                                      <span>{CurrencyFormatter.formatCurrency(item.textCreationPrice)}</span>
                                    ) : (
                                      <Trans>Free</Trans>
                                    )}
                                  </span>
                                </div>
                              ) : null}
                              {item.approveText && item.approveTextPrice ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    {CurrencyFormatter.formatCurrency(item.approveTextPrice)}
                                  </span>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <Trans>Total</Trans>:
                          </td>
                          <td className="text-end-ct">
                            <span className="h5 fontBold600">{CurrencyFormatter.formatCurrency(total)}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="text-center">
                            <div className="btn-group-md mb-2">
                              <button
                                className="btn btn-rounded font-weight-medium auth-form-btn"
                                style={{ width: "100%" }}
                                onClick={this.handleSubmit}
                              >
                                <Trans>Order now</Trans>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : placeOrdersData.length > 0 ? (
          // <div>
          //   <h4>
          //     <Trans>Order Summary</Trans>
          //   </h4>
          //   <div className="row">
          //     {placeOrdersData.map((order, index) => (
          //       <div key={index} className="col-lg-6 grid-margin">
          //         <div className="card">
          //           <div className="card-body p-4">
          //             <h4 className="card-title">
          //               {index + 1}. {order.backlink}
          //             </h4>
          //             <p>Price: {order.price}</p>
          //             <p>Total Price: {order.total_price}</p>
          //           </div>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          <section className="h-100 gradient-custom">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-10 col-xl-8">
                  <div className="card" style={{ borderRadius: "10px" }}>
                    <div className="card-header px-4 py-5">
                      <h5 className="text-muted mb-0">
                        <Trans>Thanks for your Order</Trans>,
                        <span
                          style={{ color: "#a8729a" }}
                        >{`${userData.firstName} ${userData.lastName}`}</span>
                      </h5>
                    </div>
                    <div className="card-body p-4">
                      {placeOrdersData.map((order, index) => (
                        <div className="card shadow-0 border mb-4" key={index}>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-1 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small h4">
                                  {index + 1}.
                                </p>
                              </div>
                              <div className="col-md-5 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0">
                                  {order.backlink}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  {CurrencyFormatter.formatCurrency(order.price)}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  {CurrencyFormatter.formatCurrency(order.total_price)}
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <Link
                                  className="btn btn-rounded btn-sm"
                                  style={{ whiteSpace: "nowrap" }}
                                  to={`/order/${order.id}`}
                                >
                                  <Trans>View</Trans>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="card-footer border-0 px-4 py-5"
                      style={{
                        backgroundColor: "#ea6918",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                        {/* Total paid: <span className="h2 mb-0 ms-2">$1040</span> */}
                        <Trans>Thank you</Trans>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // </div>
          <div className="d-flex justify-content-center p-3">
            <center>
              <div className="mt-5 mx-auto">
                <img
                  src={require("../../assets/images/empty.png")}
                  alt="No data found..."
                />
              </div>
              <h4>
                <Trans>Your cart is empty</Trans>.
              </h4>
              <p style={{ maxWidth: "400px" }}>
                <Trans>You can add contentlinks to your cart</Trans>.
              </p>
            </center>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Cart);
