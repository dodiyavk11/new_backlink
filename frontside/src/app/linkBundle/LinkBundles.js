import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans } from "react-i18next";
import "../../assets/custom.css";
import CurrencyFormatter from "../shared/CurrencyFormatter";
import AdminBack from "../shared/AdminBack";
import StripePayment from "../stripePayment";

export class LinkBundles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planData: [],
      userPlanActive: [],
      showModal: false,
      selectedPlan: [],
      currentBalance: 0,
      userProjects: [],
      project_id: "",
      plan_amt: 0,
      plan_id: null,
      plan_name: "",
      error: "",
      vat: 0,
      customAmount: 0,
      newAmount: 0,
      vatAmount: 0,
      paymentError: null,
      paymentModal: false,
      bundleConfigure: {
        linktarget: "",
        anchortext: "",
        publication_date: "",
        project_id: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose = () => {
    this.setState({ paymentModal: false });
  };

  handleShow = () => {
    this.closeModal();
    this.setState({ paymentModal: true });
  };

  closeModal() {
    this.setState({
      showModal: false,
      selectedPlan: [],
      project_id: "",
      orderModal: false,
      linkBundleData: [],
      error: "",
      bundleConfigure: {
        linktarget: "",
        anchortext: "",
        publication_date: "",
        project_id: "",
      },
    });
  }

  openModal(plans) {
    const vat = parseFloat(this.state.vat);
    const vatAmount = (parseFloat(plans.price) * vat) / 100;
    const totalAmount = parseFloat(plans.price) + vatAmount;

    this.setState({
      vatAmount: vatAmount,
      showModal: true,
      customAmount: plans.price,
      newAmount: totalAmount,
      selectedPlan: plans,
      plan_amt: parseFloat(plans.price),
      plan_id: plans.id,
      plan_name: plans.name,
      orderModal: false,
    });
  }

  handleChangeProject = (event) => {
    const newProjectId = event.target.value;

    this.setState((prevState) => ({
      project_id: newProjectId,
      bundleConfigure: {
        ...prevState.bundleConfigure,
        project_id: newProjectId,
      },
    }));
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      bundleConfigure: {
        ...this.state.bundleConfigure,
        [name]: value,
      },
    });
  }

  getUserWalletBalance() {
    ApiServices.getUserWalletBalance().then((res) => {
      if (res.status) {
        this.setState({
          currentBalance: res.data.data.balance ? res.data.data.balance : 0,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    });
  }

  getUserProjects() {
    ApiServices.getUserProjects().then((res) => {
      if (res.status) {
        this.setState({
          userProjects: res.data.data,
        });
      } else {
        toast.error(res.message, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    });
  }

  getLinkBundleBlogData() {
    ApiServices.getLinkBundleBlogData()
      .then((res) => {
        if (res.status) {
          this.setState({ linkBundleData: res.data.data });
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  }

  getsubscriptionPlan() {
    ApiServices.activeSubscription()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({
            planData: res.data.data.listPlan,
            userPlanActive: res.data.data.activePlan,
          });
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          AuthService.logout();
          this.props.history.push("/login");
        } else {
          if (err.response) {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        }
      });
  }

  bundlePlaceOrder = () => {
    const orderData = this.state.bundleConfigure;
    const planId = this.state.selectedPlan.id;
    ApiServices.linkBundlePlaceOrder(orderData, planId)
      .then((res) => {
        if (res.status) {
          this.closeModal();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 1500,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  componentDidMount() {
    this.getLinkBundleBlogData();
    this.getsubscriptionPlan();
    this.getUserWalletBalance();
    this.getUserProjects();
    ApiServices.getVatPercentage()
      .then((vat) => {
        if (vat) {
          this.setState({ vat: vat });
        } else {
          toast.error(<Trans>Something went to wrong.</Trans>, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast.error(<Trans>Something went to wrong.</Trans>, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  }
  render() {
    const {
      planData,
      showModal,
      selectedPlan,
      currentBalance,
      userProjects,
      project_id,
      error,
      orderModal,
      bundleConfigure,
      linkBundleData,
      plan_amt,
      plan_id,
      plan_name,
      vat,
    } = this.state;
    const { linktarget, anchortext, publication_date } =
      this.state.bundleConfigure;
    const isSubmitDisabled = !linktarget || !anchortext;
    const newRemainingBalance = currentBalance - selectedPlan.price;
    return (
      <>
        <div className="bundleLinkPage">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Link bundles</Trans> <AdminBack />
            </h3>
          </div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 blRadius">
                <div className="card-body">
                  <div className="mb-5">
                    <h2 className="fontBold latterSpacing">
                      <Trans>
                        {linkBundleData && linkBundleData.heading
                          ? linkBundleData.heading
                          : "Ultimate link building starting at 347 Euro"}
                      </Trans>
                    </h2>
                    <img
                      src={require("../../assets/images/packages.png")}
                      className="float-right"
                      style={{ width: "30%" }}
                    ></img>
                    {linkBundleData && linkBundleData.description ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: linkBundleData.description,
                        }}
                      />
                    ) : (
                      <>
                        <p className="customText2 mt-4">
                          <Trans>
                            You lack the time or expertise to search backlinks
                            from our portfolio? Our team will gladly take over
                            this task for you!
                          </Trans>
                        </p>
                        <p className="customText2">
                          <Trans>
                            Our link packages not only have impressively high
                            visibility values, the content also achieves maximum
                            topic relevance. We create an individual article for
                            each backlink and publish it with selected
                            publishers.
                          </Trans>
                        </p>
                        <p className="customText2">
                          <Trans>
                            After your booking, you can easily personalize your
                            link package by selecting the desired link targets,
                            anchor texts as well as the date of publication.
                            Then our team plans the link building measures
                            according to your specifications. As soon as all
                            backlinks from the booked link package have been
                            completed, you will receive a detailed link report.
                            If you have any questions about our link packages,
                            our support team will be happy to help you. You can
                            reach us by e-mail, live chat or phone at 0228 / 286
                            795 60.
                          </Trans>
                        </p>
                        <p className="customText2">
                          <Trans>
                            Note: We reserve the right to refuse any booking.
                            Please note that we generally refuse bookings from
                            the following areas: Eroticism, Cannabis / CBD,
                            Tobacco & Co. or Mechanical Engineering.Note: We
                            reserve the right to refuse any booking. Please note
                            that we generally refuse bookings from the following
                            areas: Eroticism, Cannabis / CBD, Tobacco & Co. or
                            Mechanical Engineering.
                          </Trans>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="pricingCard">
                  <div className="promo-container">
                    <div className="promos bg-base-1 pl-3 pr-3">
                      {planData.map((plans, index) => (
                        <div
                          key={index}
                          className={`promo ${
                            index === 0
                              ? "first"
                              : index === 1
                              ? "third scale"
                              : "second"
                          }`}
                        >
                          <h4 className="exHeading latterSpacing fontBold800">
                            {plans.name}
                            {index === 1 && (
                              <div className="popularPlan ml-2">
                                <svg
                                  width={17}
                                  id="star"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <Trans>POPULAR</Trans>
                              </div>
                            )}
                          </h4>
                          <ul className="features">
                            <li className="mt-3 h2">
                              <h2>
                                {CurrencyFormatter.formatCurrency(plans.price)}
                              </h2>
                            </li>
                            <li>{plans.description}</li>
                            <li>
                              {/* <button
                                type="button"
                                className="btn btn-rounded btn-fw btn-md"
                                onClick={() => this.openModal(plans)}
                              >
                                <Trans>Order now</Trans>
                              </button> */}
                              {!this.state.userPlanActive ? (
                                <button
                                  type="button"
                                  className="btn btn-rounded btn-fw btn-md"
                                  onClick={() => this.openModal(plans)}
                                >
                                  <Trans>Order now</Trans>
                                </button>
                              ) : this.state.userPlanActive &&
                                plans.id ===
                                  this.state.userPlanActive.plan_id ? (
                                <button className="btn btn-rounded btn-fw btn-md">
                                  <Trans>Active Plan</Trans>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-rounded btn-fw btn-md"
                                  disabled
                                >
                                  <Trans>Order Now</Trans>
                                </button>
                              )}
                            </li>
                            <li className="psale">
                              <span className="notification-icon--fixed">
                                <span className="notification-badge fontBold500">
                                  {plans.max_request_per_day}
                                </span>
                              </span>
                              <span className="psale pl-1">
                                Daily domain request to owner
                              </span>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              <Trans>DETAILS</Trans>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                Maximum Domain Request per day{" "}
                                {plans.max_request_per_day}
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                Validity {plans.validity} days
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">Direct chat to owner</span>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={showModal}
            onHide={() => this.closeModal()}
            className="addPublisherDomainModal"
            centered
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header
              className="pb-1"
              closeButton
              style={{ borderBottom: "0px" }}
            >
              <div>
                <span className="modal-title h3 font-weight-bold">
                  <Trans>Confirm order</Trans>
                </span>
                <p>
                  <Trans>
                    Click the button to complete your order. After that you can
                    fill in the details.
                  </Trans>
                </p>
              </div>
            </Modal.Header>
            <Modal.Body className="pt-1">
              <div className="modalBody">
                <div
                  className="balanceShow border mb-2 p-3"
                  style={{ borderRadius: "6px" }}
                >
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Trans>Plan </Trans>&nbsp;
                      <b>{selectedPlan.name}</b>
                    </span>
                    <span>
                      {CurrencyFormatter.formatCurrency(selectedPlan.price)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Trans>VAT</Trans> {this.state.vat}%
                    </span>
                    <span>
                      {CurrencyFormatter.formatCurrency(this.state.vatAmount)}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Trans>Total</Trans>
                    </span>
                    <span>{this.state.newAmount}</span>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer
              style={{ borderTop: "0px", justifyContent: "flex-start" }}
            >
              {error !== "" && (
                <div className="p-1 mt-2">
                  <p className="fontBold500" style={{ color: "red" }}>
                    <i className="mdi mdi-close-circle-outline mr-1"></i>
                    {error}
                  </p>
                </div>
              )}
              <Button
                className="btn btn-block btn-rounded btn-lg"
                onClick={() => this.handleShow()}
              >
                <Trans>Payments</Trans>{" "}
                {CurrencyFormatter.formatCurrency(this.state.newAmount)}
              </Button>
              <button
                className="btn btn-cancel-ctm btn-rounded btn-block"
                onClick={() => this.closeModal()}
              >
                <Trans>Cancel</Trans>
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            size="md"
            className="addBalanceModal"
            show={this.state.paymentModal}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h2 className="fontBold latterSpacing">
                  <Trans>Purchase plan</Trans> {this.state.plan_name}
                </h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StripePayment
                vat={this.state.vat}
                plan_amt={this.state.plan_amt}
                plan_name={this.state.plan_name}
                plan_id={this.state.plan_id}
                vatAmount={this.state.vatAmount}
                totalAmount={this.state.newAmount}
              />
            </Modal.Body>
            <img
              src={require("../../assets/images/by-stripe.svg")}
              alt="Success"
              style={{ width: "auto", height: "25px", marginRight: "5px" }}
            />
          </Modal>
        </div>
      </>
    );
  }
}

export default withRouter(LinkBundles);
