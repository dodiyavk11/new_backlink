import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans } from "react-i18next";
import "../../assets/custom.css";
export class LinkBundles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planData: [],
      showModal: false,
      selectedPlan: [],
      currentBalance: 0,
      userProjects: [],
      project_id: "",
      error: "",
      orderModal: false,
      bundleConfigure: {
        linktarget: "",
        anchortext: "",
        publication_date: "",
        project_id: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
    this.setState({
      showModal: true,
      selectedPlan: plans,
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
    ApiServices.subscriptionPlan()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({
            planData: res.data.data,
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

  checkBalanceToProcess() {
    const { selectedPlan } = this.state;
    ApiServices.checkBalanceForBundle(selectedPlan.id)
      .then((res) => {
        if (res.status) {
          this.setState({
            showModal: false,
            orderModal: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.message,
        });
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
              <Trans>Link bundles</Trans>
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
                      <span dangerouslySetInnerHTML={{ __html: linkBundleData.description }} />
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
                              <h2>${plans.price}</h2>
                            </li>
                            <li>{plans.description}</li>
                            <li>
                              <button
                                type="button"
                                className="btn btn-rounded btn-fw btn-md"
                                onClick={() => this.openModal(plans)}
                              >
                                <Trans>Order now</Trans>
                              </button>
                            </li>
                            <li className="psale">
                              <span className="notification-icon--fixed">
                                <span className="notification-badge fontBold500">
                                  {plans.max_domains_per_month}
                                </span>
                              </span>
                              <span className="psale pl-1">Selllinks</span>
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
                                <Trans>Cancellation period of</Trans>{" "}
                                {plans.cancellation_period} days
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                <Trans>Maximum Order per month</Trans>{" "}
                                {plans.max_orders}
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                <Trans>Validity</Trans> {plans.validity} days
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                <Trans>Credit price</Trans>{" "}
                                {plans.credits_price}
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                <Trans>Credit quota</Trans>{" "}
                                {plans.credits_quota}
                              </span>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              <Trans>REPORTING</Trans>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                <Trans>You choose the anchor text</Trans>
                              </span>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              <Trans>PLACEMENT IN</Trans>
                            </li>
                            <li className="pl-2">
                              <div className="d-flex">
                                <p className="mr-3 planRound fontBold500">
                                  <Trans>Blog</Trans>
                                </p>
                                <p className="mr-3 planRound fontBold500">
                                  <Trans>Magazines</Trans>
                                </p>
                                <p className="mr-3 planRound fontBold500">
                                  <Trans>Newspapers</Trans>
                                </p>
                              </div>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              <Trans>METRICS</Trans>
                            </li>
                            <li className="pl-2">
                              <div className="d-flex">
                                <img
                                  alt="Metrics"
                                  src={require("../../assets/images/project/ahrefs.svg")}
                                  className="rounded mr-2"
                                  width={30}
                                />
                                <div style={{ lineHeight: "normal" }}>
                                  <span className="ctColor">Domain Rating</span>
                                  <br />
                                  <span>ahrefs.com</span>
                                </div>
                                <div className="ml81">
                                  <span>Ø 20+</span>
                                </div>
                              </div>
                            </li>
                            <li className="pl-2">
                              <div className="d-flex">
                                <img
                                  alt="Metrics"
                                  src={require("../../assets/images/project/moz.svg")}
                                  className="rounded mr-2"
                                  width={30}
                                />
                                <div style={{ lineHeight: "normal" }}>
                                  <span className="ctColor">
                                    Domain Authority
                                  </span>
                                  <br />
                                  <span>moz.com</span>
                                </div>
                                <div className="ml72">
                                  <span>Ø 20+</span>
                                </div>
                              </div>
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
                      <Trans>Current balance</Trans>
                    </span>
                    <span>${currentBalance}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Trans>Link package</Trans>
                      {selectedPlan.name}
                    </span>
                    <span>${selectedPlan.price}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Trans>Remaining balance</Trans>
                    </span>
                    <span>
                      {newRemainingBalance < 0
                        ? `-$${Math.abs(newRemainingBalance).toFixed(2)}`
                        : `$${newRemainingBalance.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <label htmlFor="project_id" className="mt-2 fontBold600">
                  <Trans>Project (optional)</Trans>
                </label>
                <select
                  className="form-control"
                  id="project_id"
                  value={project_id}
                  onChange={this.handleChangeProject}
                >
                  <option value="">Select project</option>
                  {userProjects.map((option) => (
                    <option key={option.id} value={option.hash_id}>
                      {option.domain_name}
                    </option>
                  ))}
                </select>
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
                onClick={() => this.checkBalanceToProcess()}
              >
                <Trans>Order now for</Trans> ${selectedPlan.price}
              </Button>
              <button
                className="btn btn-cancel-ctm btn-rounded btn-block"
                onClick={() => this.closeModal()}
              >
                <Trans>Cancel</Trans>
              </button>
            </Modal.Footer>
          </Modal>

          {/* bundle Order configure modal */}
          <Modal
            className="orderConfigureStep1 p-2"
            centered
            backdrop="static"
            keyboard={false}
            show={orderModal}
            onHide={() => this.closeModal()}
          >
            <Modal.Header closeButton>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Confiure your order details</Trans>
              </span>
            </Modal.Header>
            <Modal.Body className="pt-1">
              <div className="row">
                <div className="col-sm-12">
                  <label htmlFor="targetUrl">
                    <Trans>Target URL*</Trans>
                    <p className="customText mb-0">
                      <Trans>Who should write your content?</Trans>
                    </p>
                  </label>

                  <input
                    type="text"
                    name="linktarget"
                    className="form-control"
                    id="targetUrl"
                    placeholder="Target Url"
                    onChange={this.handleChange}
                    value={bundleConfigure.linktarget}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label htmlFor="anchortext">
                    <Trans>Anchor text*</Trans>
                    <p className="customText mb-0">
                      <Trans>
                        Specify which anchor text to use. How to choose your
                        anchor text correctly, you will learn here Nontheless,
                        the publisher has the final say in the anchor text
                        selection.
                      </Trans>
                    </p>
                  </label>

                  <input
                    type="text"
                    name="anchortext"
                    className="form-control"
                    id="anchortext"
                    value={bundleConfigure.anchortext}
                    placeholder="High quality backlinks"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label htmlFor="publication_date">
                    <Trans>Date (optional)</Trans>
                    <p className="customText mb-0">
                      <Trans>When should your contentlink be placed?</Trans>
                    </p>
                  </label>

                  <input
                    type="date"
                    name="publication_date"
                    className="form-control border"
                    id="publication_date"
                    placeholder="03/03/2024"
                    onChange={this.handleChange}
                    value={bundleConfigure.publication_date}
                  />
                </div>
              </div>
            </Modal.Body>
            <button
              className="btn btn-rounded btn-lg font-weight-medium mb-2"
              disabled={isSubmitDisabled}
              type="button"
              onClick={this.bundlePlaceOrder}
            >
              <Trans>Buy now for</Trans> ${selectedPlan.price}
            </button>
          </Modal>
        </div>
      </>
    );
  }
}

export default withRouter(LinkBundles);
