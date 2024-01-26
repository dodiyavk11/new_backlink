import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import ApiServices from "../services/api.service";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import ActiveProjects from "./ActiveProject";
import ArchivedProjects from "./ArchivedProject";
import CreateProjectModal from "../shared/CreateProjectModal";
import { Trans } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/custom.css";

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "home",
      value: "1",
      projectsData: [],
      showModal: false,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  goToProjectViewLink = (hash_id) => {
    this.props.history.push(`/projects/${hash_id}`);
  };
  showProjectModal = () => this.setState({ showModal: true });
  closeProjectModal = () => this.setState({ showModal: false });

  handleFormSubmit = (formData) => {
    ApiServices.addUserProject(formData).then(
      () => {
        this.closeProjectModal();
        this.handleLoadData();
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

  handleLoadData = () => {
    ApiServices.getUserProjects()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({ projectsData: res.data.data });
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
  };

  componentDidMount() {
    this.handleLoadData();
  }
  render() {
    const { value } = this.state;
    return (
      <div className="projectsPage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">
            <Trans>Projects</Trans>
          </h3>
        </div>
        <ToastContainer />
        <CreateProjectModal
          showModal={this.state.showModal}
          handleClose={this.closeProjectModal}
          onSubmit={this.handleFormSubmit}
        />
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                <div className="d-flex flex-row justify-content-between">
                  <Paper className="relative rounded-1xl overflow-hidden d-flex flex-column">
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className="flex justify-between"
                    >
                      <Tabs
                        value={value}
                        textColor="primary"
                        indicatorColor="primary"
                        onChange={this.handleChange}
                      >
                        <Tab
                          value="1"
                          label={
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Trans>Active Projects</Trans>
                              <span className="notification-icon--fixed">
                                <small className="notification-badge fontBold500">
                                  {
                                    this.state.projectsData.filter(
                                      (project) => project.isArchieved === 0
                                    ).length
                                  }
                                </small>
                              </span>
                            </div>
                          }
                          className="mb-1"
                        />
                        <Tab
                          value="2"
                          label={
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Trans>Archived Projects</Trans>
                              <span className="notification-icon--fixed">
                                <small className="notification-badge fontBold500">
                                  {
                                    this.state.projectsData.filter(
                                      (project) => project.isArchieved === 1
                                    ).length
                                  }
                                </small>
                              </span>
                            </div>
                          }
                          className="mb-1"
                        />
                      </Tabs>
                    </Box>
                  </Paper>
                  <div className="p-2 bd-highlight d-flex align-items-center justify-content-center">
                    <h5 className="h5 mt-2">
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
                <hr style={{ marginTop: "0rem" }} />
                <div className="Tabcontent">
                  {value === "1" && (
                    <div>
                      {this.state.projectsData.filter(
                        (project) => project.isArchieved === 0
                      ).length > 0 ? (
                        <div className="row"  style={{ display: "flex", flexWrap: "wrap" }}>
                          {this.state.projectsData
                            .filter((project) => project.isArchieved === 0)
                            .map((project) => (
                              <ActiveProjects
                                key={project.id}
                                project={project}
                                goToProjectViewLink={this.goToProjectViewLink}
                              />
                            ))}
                        </div>
                      ) : (
                        <center>
                          <div className="mt-5 mx-auto">
                            <img
                              src={require("../../assets/images/empty.png")}
                              alt="No data found..."
                            />
                          </div>
                          <h2>
                            <Trans>No Project</Trans>
                          </h2>
                          <p>
                            <Trans>
                              No Project You do not have any Project yet. As
                              soon as you add your first Project, it will show
                              up here.
                            </Trans>
                          </p>
                          <button className="btn btn-rounded btn-fw">
                            <span
                              className="createProject"
                              onClick={this.showProjectModal}
                            >
                              <i className="mdi mdi-plus mr-2"></i>
                              <Trans>Create Project</Trans>
                            </span>
                          </button>
                        </center>
                      )}
                    </div>
                  )}

                  {value === "2" && (
                    <div>
                      {this.state.projectsData.filter(
                        (project) => project.isArchieved === 1
                      ).length > 0 ? (
                        <div className="row"  style={{ display: "flex", flexWrap: "wrap" }}>
                          {this.state.projectsData
                            .filter((project) => project.isArchieved === 1)
                            .map((project) => (
                              <ArchivedProjects
                                key={project.id}
                                project={project}
                                goToProjectViewLink={this.goToProjectViewLink}
                              />
                            ))}
                        </div>
                      ) : (
                        <center>
                          <div className="mt-5 mx-auto">
                            <img
                              src={require("../../assets/images/empty.png")}
                              alt="No data found..."
                            />
                          </div>
                          <h2>
                            <Trans>No Project</Trans>
                          </h2>
                          <p>
                            <Trans>
                              No Project You do not have any Project yet. As
                              soon as you add your first Project, it will show
                              up here.
                            </Trans>
                          </p>
                          <button className="btn btn-rounded btn-fw">
                            <span
                              className="createProject"
                              onClick={this.showProjectModal}
                            >
                              <i className="mdi mdi-plus mr-2"></i>
                              <Trans>Create Project</Trans>
                            </span>
                          </button>
                        </center>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Projects);
