import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { CPopover, CButton } from "@coreui/react";
import TableFilter from "./CustomizeTableFilter";
import MarketPlace from "./MarketPlace";
import { DailyDeals } from "./DailyDeals";
import "../../assets/custom.css";
export class ContentLinksHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1",
      qualityfilter: true,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  togglePopover = () => {
    this.setState((prevState) => ({ showPopover: !prevState.showPopover }));
  };
  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      qualityfilter: !prevState.qualityfilter,
    }));
  };
  render() {
    const { value } = this.state;
    return (
      <div className="ContentLinkHomePage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">Contentlinks</h3>
        </div>
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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "capitalize",
                                fontSize: "13px",
                              }}
                            >
                              Marketplace
                              <span className="notification-icon--fixed">
                                <small className="notification-badge fontBold500">
                                  1
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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "capitalize",
                                fontSize: "13px",
                              }}
                            >
                              Daily Deals
                              <span className="notification-icon--fixed">
                                <small className="notification-badge fontBold500">
                                  5
                                </small>
                              </span>
                            </div>
                          }
                          className="mb-1"
                        />
                      </Tabs>
                    </Box>
                  </Paper>
                  <div
                    className={`p-2 bd-highlight d-flex align-items-center justify-content-center ${
                      value === "2" ? "disabled-div" : ""
                    }`}
                  >
                    <svg
                      width={20}
                      id="lock-closed"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        color="#ff9756"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="align-items-center justify-content-center ml-1 mr-2 fontSize13">
                      Domain reveals: 20/20
                    </span>
                    <svg
                      width={20}
                      id="badge-check"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span className="align-items-center ml-1 justify-content-center mr-2 fontSize13">
                      Quality filter
                    </span>
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        checked={this.state.qualityfilter}
                        onChange={this.handleCheckboxChange}
                      />
                      <span className="slider round"></span>
                    </label>
                    <CPopover
                      // trigger="focus"
                      content={<TableFilter />}
                      placement="bottom"
                    >
                      <CButton className="btn btn-rounded custamFilterBtn">
                        <svg
                          width={20}
                          id="adjustments"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                        Customize table
                      </CButton>
                    </CPopover>
                  </div>
                </div>
                <hr style={{ marginTop: "0rem" }} />
                <div className="Tabcontent">
                  {value === "1" && (
                    <MarketPlace
                      updateCartLength={this.props.updateCartLength}
                      handleAddtoCart={this.props.handleAddtoCart}
                    />
                  )}
                  {value === "2" && (
                    <DailyDeals
                      updateCartLength={this.props.updateCartLength}
                      handleAddtoCart={this.props.handleAddtoCart}
                    />
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
export default withRouter(ContentLinksHome);
