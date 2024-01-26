import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/auth.service";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";
import "../../../assets/custom.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CurrencyFormatter from "../../shared/CurrencyFormatter";

export class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: [],
      editingPlan: null,
      showModal: false,
      linkBundleData: [],
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
    this.setState({
      editingPlan: {
        ...this.state.editingPlan,
        [name]: value,
      },
    });
  };

  handleChangeBundle = (event) => {
    const { name, value } = event.target;
    this.setState({
      linkBundleData: {
        ...this.state.linkBundleData,
        [name]: value,
      },
    });
  };

  handleEditorBundle = (value, name) => {
    this.setState((prevState) => ({
      linkBundleData: {
        ...prevState.linkBundleData,
        description: value,
      },
    }));
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

  handleUpdatePlan() {
    ApiServices.updateSubscriptionPlan(
      this.state.editingPlan,
      this.state.editingPlan.id
    )
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({
            editingPlan: null,
          });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { linkBundleData } = this.state;
    if (linkBundleData.description && linkBundleData.description !== "") {
      ApiServices.getLinkBundleBlogDataUpdate(linkBundleData)
        .then((res) => {
          if (res.status) {
            this.getLinkBundleBlogData();
            toast.success(
              <Trans>Link bundle data update successfully.</Trans>,
              {
                position: "top-right",
                autoClose: 2000,
              }
            );
          } else {
            toast.success(<Trans>Something went to wrong.</Trans>, {
              position: "top-right",
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
    } else {
      toast.error(<Trans>Please fill required fields.</Trans>, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  componentDidMount() {
    this.getLinkBundleBlogData();
    this.getsubscriptionPlan();
  }
  render() {
    const { plan, editingPlan, linkBundleData } = this.state;
    const { t } = this.props;
    return (
      <>
        <div className="bundleLinkPage adminPlan">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Plans</Trans>
            </h3>
          </div>
          <ToastContainer />
          <div className="row pr-4">
            <div className="col-lg-12 grid-margin">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="heading">
                    <Trans>Link Bundles Heading</Trans>
                  </label>
                  <Form.Control
                    required
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={t(
                      "Ultimate link building starting at 347 Euro"
                    )}
                    name="heading"
                    id="heading"
                    aria-label="heading"
                    value={(linkBundleData && linkBundleData.heading) || ""}
                    onChange={this.handleChangeBundle}
                  />
                </Form.Group>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="description">
                    <Trans>Description</Trans>
                  </label>
                  <ReactQuill
                    className="bg-light"
                    value={(linkBundleData && linkBundleData.description) || ""}
                    name="description"
                    id="description"
                    onChange={(value) =>
                      this.handleEditorBundle(value, "description")
                    }
                  />
                </Form.Group>
                <Button type="submit" className="btn btn-rounded btn-lg">
                  <Trans>Update</Trans>
                </Button>
              </Form>
            </div>
          </div>
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
                            {plans.status ? (
                              <Trans>Active</Trans>
                            ) : (
                              <Trans>Inactive</Trans>
                            )}
                          </span>
                        </div>
                        <h4 className="exHeading latterSpacing fontBold800">
                          {plans.name}
                        </h4>
                        <ul className="features">
                          <li className="mt-3 h2">
                            <h2>{CurrencyFormatter.formatCurrency(plans.price)}</h2>
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
                          <li className="detailsText pl-1 ctColor">
                            <Trans>DETAILS</Trans>
                          </li>
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
                            <Trans>REPORTING</Trans>
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
                                  <Trans>Domain Authority</Trans>
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
                            <button
                              className="btn btn-rounded font-weight-medium auth-form-btn"
                              style={{ width: "100%" }}
                              onClick={() => this.openEditModal(plans)}
                            >
                              <Trans>Edit</Trans>
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
                  <Trans>Edit Plan</Trans>
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              {editingPlan && (
                <div>
                  <Form>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="name">
                        <Trans>Name</Trans>
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control form-control-lg"
                        placeholder={t("Plan name e.g Agency")}
                        name="name"
                        id="name"
                        aria-label="name"
                        value={editingPlan.name}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="description">
                        <Trans>Description</Trans>
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control form-control-lg"
                        placeholder={t("Description")}
                        name="description"
                        id="description"
                        aria-label="description"
                        value={editingPlan.description}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="price">
                        <Trans>Price</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder={t("Price")}
                        name="price"
                        id="price"
                        aria-label="price"
                        value={editingPlan.price}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="cancellation_period"
                      >
                        <Trans>Cancellation period (in days)</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        name="cancellation_period"
                        placeholder={t("Cancellation period (in days)")}
                        id="cancellation_period"
                        aria-label="cancellation_period"
                        value={editingPlan.cancellation_period}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="max_domains_per_month"
                      >
                        <Trans>Max domains per month (in number)</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="e.g 15"
                        name="max_domains_per_month"
                        id="max_domains_per_month"
                        aria-label="max_domains_per_month"
                        value={editingPlan.max_domains_per_month}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="max_orders">
                        <Trans>Max orders</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E.g 15"
                        name="max_orders"
                        id="max_orders"
                        aria-label="max_orders"
                        value={editingPlan.max_orders}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="credits_price"
                      >
                        <Trans>Credit price</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E.g 15"
                        name="credits_price"
                        id="credits_price"
                        aria-label="credits_price"
                        value={editingPlan.credits_price}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label
                        className="font-weight-bold"
                        htmlFor="credits_quota"
                      >
                        <Trans>Credit quota</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E.g 15"
                        name="credits_quota"
                        id="credits_quota"
                        aria-label="credits_quota"
                        value={editingPlan.credits_quota}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="validity">
                        <Trans>Validity (in days)</Trans>
                      </label>
                      <Form.Control
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="E.g 30"
                        name="validity"
                        id="validity"
                        aria-label="validity"
                        value={editingPlan.validity}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="status">
                        <Trans>Status</Trans>
                      </label>
                      <Form.Control
                        as="select"
                        className="form-control form-control-lg"
                        name="status"
                        id="status"
                        aria-label="status"
                        value={editingPlan.status}
                        onChange={this.handleChange}
                      >
                        <option value="">{t("Select status")}</option>
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
                onClick={() => this.handleUpdatePlan()}
              >
                <Trans>Update plan</Trans>
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

// export default withRouter(Plan);
export default withTranslation()(Plan);
