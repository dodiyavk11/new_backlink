import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { CPopover, CButton } from "@coreui/react";
import "../../assets/custom.css";
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
  render() {
    const { tabValue } = this.state;
    return (
      <div className="settingPage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">Settings</h3>
        </div>
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
                              Profile                             
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
                              Account                              
                            </div>
                          }
                          className="mb-1"
                        />
                        <Tab
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
                              Notification                              
                            </div>
                          }
                          className="mb-1"
                        />
                      </Tabs>
                    </Box>
                  </Paper>
                </div>
                <hr style={{ marginTop: "0rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Profile);
