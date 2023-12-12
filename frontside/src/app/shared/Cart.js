import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../assets/custom.css";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../shared/CartItem";
export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
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
    const { cartItems } = this.state;
    const total = this.calculateTotal();
    return (
      <div className="CartPage">
        <div className="page-header">
        <ToastContainer />
          <h3 className="fontBold latterSpacing">Cart</h3>
        </div>
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
                  <h4 className="card-title">Summary</h4>
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
                                    Text - {item.wordCount} Words
                                  </span>
                                </div>
                              ) : null}
                              {item.approveText ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    Approve text before publication
                                  </span>
                                </div>
                              ) : null}
                            </td>
                            <td className="text-end-ct">
                              <b>${item.total_price}</b>
                              {item.textCreation !== "Own" ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    {item.textCreationPrice
                                      ? `$${item.textCreationPrice}`
                                      : "Free"}
                                  </span>
                                </div>
                              ) : null}
                              {item.approveText && item.approveTextPrice ? (
                                <div className="mt-1">
                                  <br />
                                  <span className="mt-1">
                                    ${item.approveTextPrice}
                                  </span>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>Total:</td>
                          <td className="text-end-ct">
                            <span className="h5 fontBold600">${total}</span>
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
                                Order now
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
        ) : (
          <div className="d-flex justify-content-center p-3">
            <center>
              <div className="mt-5 mx-auto">
                <img
                  src={require("../../assets/images/empty.png")}
                  alt="No data found..."
                />
              </div>
              <h4>Your cart is empty.</h4>
              <p style={{ maxWidth: "400px" }}>
                You can add contentlinks to your cart.
              </p>
            </center>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Cart);
