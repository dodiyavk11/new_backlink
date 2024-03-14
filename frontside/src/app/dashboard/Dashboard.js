import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateProjectModal from "../shared/CreateProjectModal";
import AdminBack from "../shared/AdminBack";
import DomainComponent from "./Domain";
import ContentLinksComponent from "./contentLinks";
import ApiServices from "../services/api.service";
import { Trans } from "react-i18next";
import "../../assets/custom.css";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: {},
      domains: [],
      contentData: [],
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
  goToProjectViewLink = (hash_id) => {
    this.props.history.push(`/projects/${hash_id}`);
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
          if (res.data.data.contentData) {
            this.setState({ contentData: res.data.data.contentData });
          }
        }
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          AuthService.logout();
          this.props.history.push("/login");
        } else {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
  }
  render() {
    return (
      <>
        <div className="dashboardHome">
          <ToastContainer />
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Dashboard(U)</Trans> <AdminBack />
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-12 grid-margin">              
              <div className="card bRadius cRadiusBottom">
                <div className="card-body dashProHead">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="p-2 bd-highlight d-flex flex-column">
                      <h5 className="card-title">
                        <Trans>Projects</Trans>
                      </h5>
                    </div>
                    <div className="p-2 bd-highlight d-flex align-items-center justify-content-center">
                      <h5 className="card-title">
                        <span
                          className="createProject"
                          onClick={this.showProjectModal}
                        >
                          <i className="mdi mdi-plus mr-2"></i>
                          <Trans>Create Project</Trans>
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.domains.map((item) => (
                <DomainComponent
                  key={item.id}
                  item={item}
                  goToProjectViewLink={this.goToProjectViewLink}
                />
              ))}
              {!this.state.domains.length && (
                <div className="card bRadius cRadiusTop">
                  <div className="card-body dashboardCard mb-2">
                    <h4 className="text-center">
                      <Trans>No projects yet</Trans>
                    </h4>
                  </div>
                </div>
              )}
              {this.state.domains.length > 0 && (
                <div className="card bRadius cRadiusTop">
                  <div className="card-body text-center">
                    <hr />
                    <Link to="/projects" className="hrefTitle">
                      <Trans>View all</Trans>
                    </Link>
                  </div>
                </div>
              )}
            </div>            
          </div>
          <div className="row">
            <div className="col-lg-8 grid-margin stretch-card">
              <div className="card bRadius">
                <div className="card-body">
                  <h4 className="card-title">
                    <Trans>Daily Deals</Trans> 5
                  </h4>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-hover top5Deals">
                      <thead>
                        <tr>
                          <th>
                            <Trans>Name</Trans>
                          </th>
                          <th>
                            <Trans>DR</Trans>
                          </th>
                          <th>
                            <Trans>DA</Trans>
                          </th>
                          <th>
                            <Trans>TF</Trans>
                          </th>
                          <th>
                            <Trans>Price</Trans>
                          </th>
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
                    <hr />
                    <Link to="/marketplace/contentlinks" className="hrefTitle">
                      <Trans>View all</Trans>
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
                    <Trans>For Backlinks</Trans>
                  </text>
                </svg>
                <div className="card-body" style={{ padding: "1.5rem 1.5rem" }}>
                  <h5 className="card-title">
                    <Trans>Resource</Trans>
                  </h5>
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
                    <Trans>Discover more</Trans>
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
