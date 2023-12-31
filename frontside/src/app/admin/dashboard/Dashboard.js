import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import AuthService from "../../services/api.service"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import CreateProjectModal from "../shared/CreateProjectModal";
import OrderComponent from "./Order";
import DomainComponent from "./Domain";
import ContentLinksComponent from "./contentLinks";
import ApiServices from "../../services/api.service";
// import StripePayment from "../stripePayment";
import "../../../assets/custom.css";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: {},
      domains: [],
      balance: 0,
      orders: [],
      contentData: [],
      show: false,
      showModal: false,
    };
  }
  showProjectModal = () => this.setState({ showModal: true });
  closeProjectModal = () => this.setState({ showModal: false });

  handleClose = () => {
    this.setState({ show: false });
  };
  goToContentLink = (hash_id) => {
    this.props.history.push(`/content/${hash_id}`);
  };
  goToOrderLink = (order_id) => {
    this.props.history.push(`/order/${order_id}`);
  };
  goToProjectViewLink = (hash_id) => {
    this.props.history.push(`/projects/${hash_id}`);
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  handleFormSubmit = (formData) => {
    ApiServices.addUserProject(formData).then(
      () => {
        this.closeProjectModal();
        this.props.history.push("/projects");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    );
  };
  componentDidMount() {
    ApiServices.getDashboard()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({ dashboardData: res.data.data });
          this.setState({ domains: res.data.data.domains });
          if (res.data.data.orders) {
            this.setState({ orders: res.data.data.orders });
          }
          if (res.data.data.contentData) {
            this.setState({ contentData: res.data.data.contentData });
          }
          if (res.data.data.userAccountBalnace) {
            this.setState({
              balance: res.data.data.userAccountBalnace.balance,
            });
          }
        }
      })
      .catch((err) => {
        // if (
        //   err.response.status === 401 &&
        //   err.response.data.message !== "You cannot access this page"
        // ) {
        //   this.setState({ isAuthenticated: false });
        //   AuthService.logout();
        //   this.props.history.push("/login");
        // } else {
        //   toast.error(err.response.data.message, {
        //     position: "top-center",
        //     autoClose: 2000,
        //   });
        // }
      });
  }
  render() {
    return (
      <>
        <div className="dashboardHome">
          <Modal
            size="md"
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h2>Add balance</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{/* <StripePayment /> */}</Modal.Body>
            {/* <Modal.Footer>
            <Button className="btn btn-gradient-secondary btn-rounded btn-fw" variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button className="btn btn-gradient-primary btn-rounded btn-fw" variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
          </Modal>
          <ToastContainer />
          <div className="page-header">
            <h3 className="fontBold latterSpacing">Dashboard(A)</h3>
          </div>
          <div className="row">
            <div className="col-lg-6 grid-margin">
              <div className="card mb-4 bRadius">
                <div className="card-body dashboardCard">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="p-2 bd-highlight d-flex flex-column">
                      <h4>Available</h4>
                      <h2>
                        <b>${parseFloat(this.state.balance).toFixed(2)}</b>
                      </h2>
                    </div>
                    <div className="p-2 bd-highlight d-flex align-items-center justify-content-center">
                      <button
                        onClick={this.handleShow}
                        type="button"
                        className="btn btn-rounded btn-fw"
                      >
                        <i className="mdi mdi-plus mr-2"></i>Add Balance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bRadius cRadiusBottom">
                <div className="card-body dashProHead">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="p-2 bd-highlight d-flex flex-column">
                      <h5 className="card-title">Projects</h5>
                    </div>
                    <div className="p-2 bd-highlight d-flex align-items-center justify-content-center">
                      <h5 className="card-title">
                        <span
                          className="createProject"
                          onClick={this.showProjectModal}
                        >
                          <i className="mdi mdi-plus mr-2"></i>Create Project
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.domains.map((item) => (
                <DomainComponent key={item.id} item={item} goToProjectViewLink={this.goToProjectViewLink}/>
              ))}
              {!this.state.domains.length && (
                <div className="card bRadius cRadiusTop">
                  <div className="card-body dashboardCard mb-2">
                    <h4 className="text-center">No projects yet</h4>
                  </div>
                </div>
              )}
              {this.state.domains.length > 0 && (
                <div className="card bRadius cRadiusTop">
                  <div className="card-body text-center">
                    <hr/>
                    <Link to="/projects" className="hrefTitle">
                      View all
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card bRadius">
                <div className="card-body">
                  <h4 className="card-title">Orders</h4>
                  {this.state.orders.map((order) => (
                    <OrderComponent key={order.id} order={order} />
                  ))}
                  {!this.state.orders.length && (
                    <div className="card">
                      <div className="card-body dashboardCard">
                        <h4 className="text-center">No Orders.</h4>
                      </div>
                    </div>
                  )}
                </div>
                {this.state.orders.length > 0 && (
                  <div className="card bRadius cRadiusTop">                    
                    <div className="card-body text-center">
                      <hr/>
                      <Link to="/orders" className="hrefTitle">
                        View all
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 grid-margin stretch-card">
              <div className="card bRadius">
                <div className="card-body">
                  <h4 className="card-title">Daily Deals 5</h4>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-hover top5Deals">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>DR</th>
                          <th>DA</th>
                          <th>TF</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.contentData.map((content) => (
                          <ContentLinksComponent
                            key={content.hash_id}
                            content={content}
                            goToContentLink={this.goToContentLink}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card bRadius cRadiusTop">
                  <div className="card-body text-center">
                    <hr/>
                    <Link to="/basic-ui/buttons" className="hrefTitle">
                      View all
                    </Link>
                  </div>
                  </div>
              </div>
            </div>
            <div className="col-lg-4 grid-margin stretch-card">
              <div className="card bRadius">
                {/* <img
                className="card-img-top"
                src={require("../../assets/images/demo.svg")}
                alt="Card image cap"
              /> */}
                <svg
                  className="card-img-top bRadius"
                  xmlns="http://www.w3.org/2000/svg"
                  width="370"
                  height="235"
                >
                  <rect width="100%" height="100%" fill="#ff9756" />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="20"
                    fill="white"
                  >
                    For Backlinks
                  </text>
                </svg>
                <div className="card-body" style={{ padding: "1.5rem 1.5rem" }}>
                  <h5 className="card-title">Resource</h5>
                  <div className="d-flex justify-content-between p-1">
                    <div className="mr-2">
                      <svg
                        className="card-img-top"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="50"
                      >
                        <rect width="100%" height="100%" fill="#ff9756" />
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontSize="15"
                          fill="white"
                        >
                          Blog 1
                        </text>
                      </svg>
                    </div>
                    <div>
                      <p className="text-justify" style={{ fontSize: "13px" }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. test tests
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between p-1">
                    <div className="mr-2">
                      <svg
                        className="card-img-top"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="50"
                      >
                        <rect width="100%" height="100%" fill="#ff9756" />
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontSize="15"
                          fill="white"
                        >
                          Blog 2
                        </text>
                      </svg>
                    </div>
                    <div>
                      <p className="text-justify" style={{ fontSize: "13px" }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. test tests
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between p-1">
                    <div className="mr-2">
                      <svg
                        className="card-img-top"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="50"
                      >
                        <rect width="100%" height="100%" fill="#ff9756" />
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontSize="15"
                          fill="white"
                        >
                          Blog 3
                        </text>
                      </svg>
                    </div>
                    <div>
                      <p className="text-justify" style={{ fontSize: "13px" }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. test tests
                      </p>
                    </div>
                  </div>
                </div>
                  <div className="card-body text-center">
                    <Link to="/basic-ui/buttons" className="hrefTitle">
                      Discover more
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <CreateProjectModal
          showModal={this.state.showModal}
          handleClose={this.closeProjectModal}
          onSubmit={this.handleFormSubmit}
        />
      </>
    );
  }
}
export default withRouter(Dashboard);
