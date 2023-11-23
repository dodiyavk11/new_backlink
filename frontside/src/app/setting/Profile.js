import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { CPopover, CButton } from "@coreui/react";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { Account } from "./Account";
import { Notification } from "./Notification";
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
  componentDidMount() {
    this.checkURL();
    window.addEventListener('popstate', this.checkURL);
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this.checkURL);
  }
  checkURL = () => {
    const pathname = window.location.pathname;

    if (pathname === '/app/settings/profile') {
      this.setState({ tabValue: "1" });
    } else if (pathname === '/app/settings/account') {
      this.setState({ tabValue: "2" });
    } else if (pathname === '/app/settings/notifications') {
      this.setState({ tabValue: "3" });
    }
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
                <div className="Tabcontent">
                  {tabValue === "1" && (
                    <div className="profileTabData">
                      <Box>
                        <Card variant="outlined">
                          {" "}
                          <CardContent>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="mt-2">
                                  <h5>Personal information</h5>
                                </div>
                              </div>
                            </div>
                            <form className="forms-sample">
                              <Form.Group className="row">
                                <label
                                  htmlFor="demail"
                                  className="col-sm-3 col-form-label"
                                >
                                  <Typography className="customText2">
                                    Email address
                                  </Typography>
                                  <Typography className="customText">
                                    You can change your email address{" "}
                                    <Link
                                      to="/settings/account"
                                      className="no-underline customText textColorCls"
                                      style={{ textDecoration: "none" }}
                                    >
                                      in the account section.
                                    </Link>
                                  </Typography>
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="email"
                                    disabled
                                    value={"demo@demo.com"}
                                    className="form-control mt-4"
                                    id="demail"
                                    placeholder="Email"
                                  />
                                </div>
                              </Form.Group>
                              <Divider />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="fname"
                                  className="col-sm-3 col-form-label"
                                >
                                  Firstname*
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    id="fname"
                                    placeholder="Firstname"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="lname"
                                  className="col-sm-3 col-form-label"
                                >
                                  Lastname*
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    name="lastName"
                                    type="text"
                                    className="form-control"
                                    id="lname"
                                    placeholder="Lastname"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="address"
                                  className="col-sm-3 col-form-label"
                                >
                                  Address*
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    id="address"
                                    placeholder="Address"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="pcode"
                                  className="col-sm-3 col-form-label"
                                >
                                  Postal code*
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="postalCode"
                                    className="form-control"
                                    id="pcode"
                                    placeholder="12345"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="city"
                                  className="col-sm-3 col-form-label"
                                >
                                  City*
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    id="city"
                                    placeholder="New York"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="country"
                                  className="col-sm-3 col-form-label"
                                >
                                  {" "}
                                  Country*
                                  <Typography className="customText">
                                    To change the country of the billing
                                    address, please contact us at
                                    support@backlinked.de.
                                  </Typography>
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="country"
                                    disabled
                                    value={"Germany"}
                                    className="form-control mt-4"
                                    id="country"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="pnumber"
                                  className="col-sm-3 col-form-label"
                                >
                                  {" "}
                                  Phone Number*
                                  <Typography className="customText">
                                    By providing your phone number we can reach
                                    you faster in case of issues.
                                  </Typography>
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={"1234567890"}
                                    className="form-control mt-4"
                                    id="pnumber"
                                  />
                                </div>
                              </Form.Group>
                            </form>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box className="mt-4">
                        <Card variant="outlined">
                          {" "}
                          <CardContent>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="mt-2">
                                  <h5>Business information</h5>
                                  <Typography className="customText">
                                    To change your company information, please
                                    contact us at support@backlinked.de.
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <form className="forms-sample">
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="cname"
                                  className="col-sm-3 col-form-label"
                                >
                                  Company name*
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    id="cname"
                                    placeholder="Test"
                                  />
                                </div>
                              </Form.Group>
                              <Divider className="mt-3" />
                              <Form.Group className="row mt-3">
                                <label
                                  htmlFor="vat"
                                  className="col-sm-3 col-form-label"
                                >
                                  Vat ID*
                                  <Typography className="customText">
                                    Mandatory for customers outside of Germany
                                  </Typography>
                                </label>
                                <div className="col-sm-9">
                                  <Form.Control
                                    type="text"
                                    name="vatId"
                                    className="form-control"
                                    id="vat"
                                    placeholder="Vat ID"
                                  />
                                </div>
                              </Form.Group>
                            </form>
                          </CardContent>
                        </Card>
                      </Box>
                      <button className="btn btn-rounded mt-4">Save Change</button>
                    </div>
                  )}
                  {tabValue === "2" && <Account />}
                  {tabValue === "3" && <Notification/>}
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
