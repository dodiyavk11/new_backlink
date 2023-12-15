import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import ApiServices from "../../services/api.service";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import ProjectList from "./ProjectList";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/custom.css";

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1",
      searchValue: "",
      archivedProject: [],
      nonArchivedProject: [],
    };
  }
  handleOnSearch = (e) => {
    this.handleLoadData(e.target.value, this.state.value);
    this.setState({ searchValue: e.target.value });
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  }; 

  handleLoadData = (filter = null, tab = 0) => {
    ApiServices.adminProjectList(filter, tab)
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (filter === null && tab === 0) {
            this.setState({
              archivedProject: res.data.data.archivedProject,
              nonArchivedProject: res.data.data.nonArchivedProject,
            });
          } else {
            if (tab === "1") {
              this.setState({
                nonArchivedProject: res.data.data.nonArchivedProject,
              });
            } else {
              this.setState({
                archivedProject: res.data.data.archivedProject,
              });
            }
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
  };

  componentDidMount() {
    this.handleLoadData();
  }
  render() {
    const { value, searchValue } = this.state;
    return (
      <div className="projectsPage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">Projects List</h3>
        </div>
        <ToastContainer />
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
                              Active Projects
                              <span className="notification-icon--fixed">
                                <small className="notification-badge fontBold500">
                                  {this.state.nonArchivedProject.length}
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
                              Archived Projects
                              <span className="notification-icon--fixed">
                                <small className="notification-badge fontBold500">
                                  {this.state.archivedProject.length}
                                </small>
                              </span>
                            </div>
                          }
                          className="mb-1"
                        />
                      </Tabs>
                    </Box>
                  </Paper>
                </div>
                <div className="Tabcontent">
                  <input
                    type="search"
                    placeholder="Search"
                    className="form-control border bRadius mt-3"
                    onChange={this.handleOnSearch}
                    value={searchValue}
                  />
                  <hr />
                  {value === "1" &&
                    (this.state.nonArchivedProject.length > 0 ? (
                      <ProjectList
                        activeProjects={this.state.nonArchivedProject}
                      />
                    ) : (
                      <center>
                        <div className="mt-5 mx-auto">
                          <img
                            src={require("../../../assets/images/empty.png")}
                            alt="No data found..."
                          />
                        </div>
                        <h2>No Active Project</h2>
                      </center>
                    ))}
                  {value === "2" &&
                    (this.state.archivedProject.length > 0 ? (
                      <ProjectList
                        activeProjects={this.state.archivedProject}
                      />
                    ) : (
                      <center>
                        <div className="mt-5 mx-auto">
                          <img
                            src={require("../../../assets/images/empty.png")}
                            alt="No data found..."
                          />
                        </div>
                        <h2>No Archived Projects</h2>
                      </center>
                    ))}
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
