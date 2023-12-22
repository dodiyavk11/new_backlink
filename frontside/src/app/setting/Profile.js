import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { Account } from "./Account";
import { Notification } from "./Notification";
import { ProfileContent } from "./ProfileContent";
import "../../assets/custom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "1",
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };
  updateTabValue = (value) => {
    this.setState({ tabValue: value });
  };
  componentDidMount() {
    setTimeout(() => {
      const pathname = window.location.pathname;
      if (pathname === "/app/settings/profile") {
        this.setState({ tabValue: "1" });
      } else if (pathname === "/app/settings/account") {
        this.setState({ tabValue: "2" });
      } else if (pathname === "/app/settings/notifications") {
        this.setState({ tabValue: "3" });
      }
    }, 1500);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.checkURL();
    }
  }
  checkURL = () => {
    const pathname = window.location.pathname;
    if (pathname === "/app/settings/profile") {
      this.setState({ tabValue: "1" });
    } else if (pathname === "/app/settings/account") {
      this.setState({ tabValue: "2" });
    } else if (pathname === "/app/settings/notifications") {
      this.setState({ tabValue: "3" });
    }
  };

  render() {
    const { tabValue } = this.state;
    return (
      <div className="settingPage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">
            <Trans>Settings</Trans>
          </h3>
        </div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius2">
              <div className="card-body projectsCard">
                <div className="d-flex flex-row justify-content-between">
                  <Paper className="relative rounded-1xl overflow-hidden d-flex flex-column">
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className="flex justify-between"
                    >
                      <Tabs
                        value={tabValue}
                        textColor="primary"
                        indicatorColor="primary"
                        onChange={this.handleChange}
                      >
                        <Tab
                          value="1"
                          label={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              <Trans>Profile</Trans>
                            </div>
                          }
                          className="mb-1"
                        />
                        <Tab
                          value="2"
                          label={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              <Trans>Account</Trans>
                            </div>
                          }
                          className="mb-1"
                        />
                        <Tab
                          disabled={this.props.isAdmin !== "0"}
                          value="3"
                          label={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              <Trans>Notifications</Trans>
                            </div>
                          }
                          className="mb-1"
                        />
                      </Tabs>
                    </Box>
                  </Paper>
                </div>
                <hr style={{ marginTop: "0rem" }} />
                <div className="Tabcontent">
                  {tabValue === "1" && (
                    <ProfileContent updateTabValue={this.updateTabValue} />
                  )}
                  {tabValue === "2" && <Account />}
                  {tabValue === "3" && <Notification />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Profile);
