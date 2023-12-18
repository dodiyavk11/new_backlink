import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { Modal, Button, Form } from "react-bootstrap";
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
    };
  }

  closeModal() {
    this.setState({
      showModal: false,
      selectedPlan: [],
      project_id:""
    });
  }

  openModal(plans) {
    this.setState({
      showModal: true,
      selectedPlan: plans,
    });
  }

  handleChangeProject = (event) => {
    this.setState({ project_id: event.target.value });
  };

  getUserWalletBalance() {
    ApiServices.getUserWalletBalance().then((res) => {
      if (res.status) {
        this.setState({
          currentBalance: res.data.data.balance ? res.data.data.balance : 0,
        });
      } else {
        toast.error(res.message, {
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

  componentDidMount() {
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
    } = this.state;
    const newRemainingBalance = currentBalance - selectedPlan.price;
    return (
      <>
        <div className="bundleLinkPage">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">Link bundles</h3>
          </div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 blRadius">
                <div className="card-body">
                  <div className="mb-5">
                    <h2 className="fontBold latterSpacing">
                      {" "}
                      Ultimate link building starting at 347 Euro
                    </h2>
                    <img
                      src={require("../../assets/images/packages.png")}
                      className="float-right"
                      style={{ width: "30%" }}
                    ></img>
                    <p className="customText2 mt-4">
                      You lack the time or expertise to search backlinks from
                      our portfolio? Our team will gladly take over this task
                      for you!
                    </p>
                    <p className="customText2">
                      Our link packages not only have impressively high
                      visibility values, the content also achieves maximum topic
                      relevance. We create an individual article for each
                      backlink and publish it with selected publishers.
                    </p>
                    <p className="customText2">
                      After your booking, you can easily personalize your link
                      package by selecting the desired link targets, anchor
                      texts as well as the date of publication. Then our team
                      plans the link building measures according to your
                      specifications. As soon as all backlinks from the booked
                      link package have been completed, you will receive a
                      detailed link report. If you have any questions about our
                      link packages, our support team will be happy to help you.
                      You can reach us by e-mail, live chat or phone at 0228 /
                      286 795 60.
                    </p>
                    <p className="customText2">
                      Note: We reserve the right to refuse any booking. Please
                      note that we generally refuse bookings from the following
                      areas: Eroticism, Cannabis / CBD, Tobacco & Co. or
                      Mechanical Engineering.Note: We reserve the right to
                      refuse any booking. Please note that we generally refuse
                      bookings from the following areas: Eroticism, Cannabis /
                      CBD, Tobacco & Co. or Mechanical Engineering.
                    </p>
                  </div>
                </div>
                <div className="pricingCard">
                  <div className="promo-container">
                    <div className="promos bg-base-1">
                      {planData.map((plans, index) => (
                        <div
                          key={index}
                          className={`promo ${
                            index === 0
                              ? "first"
                              : index === 1
                              ? "second"
                              : "third scale"
                          }`}
                        >
                          <h4 className="exHeading latterSpacing fontBold800">
                            {plans.name}
                            {index === 2 && (
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
                                POPULAR
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
                                Order now
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
                              DETAILS
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                Cancellation period of{" "}
                                {plans.cancellation_period} days
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                Maximum Order per month {plans.max_orders}
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
                              <span className="ml-1">
                                Credit price {plans.credits_price}
                              </span>
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                Credit quota {plans.credits_quota}
                              </span>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              REPORTING
                            </li>
                            <li className="pl-1">
                              <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                              <span className="ml-1">
                                You choose the anchor text
                              </span>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              PLACEMENT IN
                            </li>
                            <li className="pl-2">
                              <div className="d-flex">
                                <p className="mr-3 planRound fontBold500">
                                  Blog
                                </p>
                                <p className="mr-3 planRound fontBold500">
                                  Magazines
                                </p>
                                <p className="mr-3 planRound fontBold500">
                                  Newspapers
                                </p>
                              </div>
                            </li>
                            <li>
                              <hr />
                            </li>
                            <li className="detailsText pl-1 ctColor">
                              METRICS
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
                  Confirm order
                </span>
                <p>
                  Click the button to complete your order. After that you can
                  fill in the details.
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
                    <span>Current balance</span>
                    <span>${currentBalance}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Link package {selectedPlan.name}</span>
                    <span>${selectedPlan.price}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Remaining balance</span>
                    <span>
                      {newRemainingBalance < 0
                        ? `-$${Math.abs(newRemainingBalance).toFixed(2)}`
                        : `$${newRemainingBalance.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <label htmlFor="project_id" className="mt-2 fontBold600">
                  Project (optional)
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
            <Modal.Footer style={{ borderTop: "0px" }}>
              <Button
                className="btn btn-block btn-rounded btn-lg"
                // onClick={() => this.addEmailTemplate()}
              >
                Order now for ${selectedPlan.price}
              </Button>
              <button
                className="btn btn-cancel-ctm btn-rounded btn-block"
                onClick={() => this.closeModal()}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default withRouter(LinkBundles);
