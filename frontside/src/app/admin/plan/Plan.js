import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/auth.service";
import { Modal, Button, Form } from "react-bootstrap";
import "../../../assets/custom.css";
export class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: [],
      editingPlan: null,
      showModal: false,
    };
  }

  openEditModal(plan) {
    this.setState({
      editingPlan: plan,
      showModal: true,
    });
  }

  closeEditModal() {
    this.setState({
      editingPlan: null,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
            plan: res.data.data,
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

  updatePlanStatus(id, status) {
    ApiServices.updatePlanStatus(id, status ? 0 : 1)
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
          this.getsubscriptionPlan();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  }

  componentDidMount() {
    this.getsubscriptionPlan();
  }
  render() {
    const { plan, editingPlan } = this.state;
    return (
      <>
        <div className="bundleLinkPage adminPlan">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">Plan</h3>
          </div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="pricingCard">
                <div className="promo-container">
                  <div className="promos bg-base-1">
                    {plan.map((plans, index) => (
                      <div className="promo" key={index}>
                        <div className="d-flex justify-content-between">
                          <span></span>
                          <span
                            className={`fontSize13 badge bRadius planlist ${
                              plans.status ? "badge-success" : "badge-danger"
                            }`}
                            title="Click here to change status"
                            onClick={() =>
                              this.updatePlanStatus(plans.id, plans.status)
                            }
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                          >
                            <i
                              className={` mr-1
                                  ${
                                    plans.status
                                      ? "mdi mdi-check-circle"
                                      : "mdi mdi-close-circle"
                                  }`}
                            ></i>
                            {plans.status ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <h4 className="exHeading latterSpacing fontBold800">
                          {plans.name}
                        </h4>
                        <ul className="features">
                          <li className="mt-3 h2">
                            <h2>${plans.price}</h2>
                          </li>
                          <li>{plans.description}</li>
                          <li>
                            <hr />
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
                          <li className="detailsText pl-1 ctColor">DETAILS</li>
                          <li className="pl-1">
                            <i className="mdi mdi-checkbox-marked-circle fontBold500"></i>
                            <span className="ml-1">
                              Cancellation period of {plans.cancellation_period}{" "}
                              days
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
                              <p className="mr-3 planRound fontBold500">Blog</p>
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
                          <li className="detailsText pl-1 ctColor">METRICS</li>
                          <li className="pl-2">
                            <div className="d-flex">
                              <img
                                alt="Metrics"
                                src={require("../../../assets/images/project/ahrefs.svg")}
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
                                src={require("../../../assets/images/project/moz.svg")}
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
                          <li className="mt-5">
                            {/* <span
                              className="fontSize13 badge bRadius planlist badge-primary"
                              title="Click here to edit plan"
                              onClick={() => this.openEditModal(plans)}
                              style={{
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: "18px",
                              }}
                            >
                              <i className="mdi mdi-pencil"></i>
                              Edit
                            </span> */}
                            <button
                              className="btn btn-rounded font-weight-medium auth-form-btn"
                              style={{ width: "100%" }}
                              onClick={() => this.openEditModal(plans)}
                            >
                              Edit
                            </button>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={!!editingPlan}
            onHide={() => this.closeEditModal()}
            className="addPublisherDomainModal"
            centered
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <div>
                <span className="modal-title h3 font-weight-bold">
                  Edit Plan
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              {editingPlan && (
                <div>
                  <Form>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="name">
                        Name
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Plan name e.g Agency"
                        name="name"
                        id="name"
                        aria-label="name"
                        // value={editingPlan.name}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="description">
                        Description
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Description"
                        name="description"
                        id="description"
                        aria-label="description"
                        // value={editingPlan.description}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="price">
                        Price
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Price"
                        name="price"
                        id="price"
                        aria-label="price"
                        // value={editingPlan.price}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="cancellation_period"
                      >
                        Cancellation period (in days)
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Price"
                        name="cancellation_period"
                        id="cancellation_period"
                        aria-label="cancellation_period"
                        // value={editingPlan.cancellation_period}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="max_domains_per_month"
                      >
                        Max domains per_month (in number)
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E,g 15"
                        name="max_domains_per_month"
                        id="max_domains_per_month"
                        aria-label="max_domains_per_month"
                        // value={editingPlan.max_domains_per_month}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="max_orders">
                        Max orders
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E,g 15"
                        name="max_orders"
                        id="max_orders"
                        aria-label="max_orders"
                        // value={editingPlan.max_orders}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="credits_price"
                      >
                        Credit price
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E,g 15"
                        name="credits_price"
                        id="credits_price"
                        aria-label="credits_price"
                        // value={editingPlan.credits_price}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="credits_quota"
                      >
                        Credit quota
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E,g 15"
                        name="credits_quota"
                        id="credits_quota"
                        aria-label="credits_quota"
                        // value={editingPlan.credits_quota}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="validity">
                        Validity (in days)
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E,g 30"
                        name="validity"
                        id="validity"
                        aria-label="validity"
                        // value={editingPlan.validity}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="status">
                        Status
                      </label>
                      <Form.Control
                        as="select" // Use "as" prop to specify the type as a select box
                        className="form-control form-control-lg"
                        name="status"
                        id="status"
                        aria-label="status"
                        // value={editingPlan.status}
                        // onChange={(e) => {
                        //   this.setState({
                        //     editingPlan: {
                        //       ...editingPlan,
                        //       name: e.target.value,
                        //     },
                        //   });
                        // }}
                      >
                        <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-block btn-rounded btn-lg"
                // onClick={() => this.handleUpdatePlan()}
              >
                Update plan
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default withRouter(Plan);
