import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Form } from "react-bootstrap";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import "../../assets/custom.css";
export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="accountTabData">
        <Box>
          <Card variant="outlined">
            {" "}
            <CardContent>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mt-2">
                    <h5>Update e-mail address</h5>
                  </div>
                </div>
              </div>
              <form className="updateEmailForm" id="updateEmailForm">
                <Form.Group className="row">
                  <label htmlFor="nmail" className="col-sm-3 col-form-label">
                    New e-mail address*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="email"
                      name="newEmail"
                      className="form-control"
                      id="nmail"
                      placeholder="demo@demo.com"
                    />
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row mt-3">
                  <label htmlFor="remail" className="col-sm-3 col-form-label">
                    Repeat E-Mail address*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="email"
                      name="reEmail"
                      className="form-control"
                      id="remail"
                      placeholder="demo@demo.com"
                    />
                  </div>
                </Form.Group>
                <button className="btn btn-rounded btn-lg">Save Changes</button>
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
                    <h5>Invoice settings</h5>
                  </div>
                </div>
              </div>
              <form className="invoiceSettingForm" id="invoiceSettingForm">
                <Form.Group className="row">
                  <label htmlFor="binvoice" className="col-sm-3 col-form-label">
                    Bulk invoice
                    <Typography className="customText">
                      Receive a bulk invoice at the end of the month for all
                      bookings completed in that month.
                    </Typography>
                  </label>
                  <div className="col-sm-9 text-right">
                    <label className="switch mr-2">
                      <input type="checkbox" id="binvoice" name="bulkInvoice" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="iemail" className="col-sm-3 col-form-label">
                    Invoice e-mail address
                    <Typography className="customText">
                      Enter the email address that should receive additionally
                      invoices and funding confirmations / payment invoices.
                    </Typography>
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="invoiceEmail"
                      className="form-control"
                      id="iemail"
                      placeholder="demo.user@fairlinked.com"
                    />
                  </div>
                </Form.Group>
                <button className="btn btn-rounded btn-lg">Save Changes</button>
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
                    <h5>Change password</h5>
                  </div>
                </div>
              </div>
              <form className="chnagepasswordForm" id="chnagepasswordForm">
                <Form.Group className="row">
                  <label htmlFor="cpass" className="col-sm-3 col-form-label">
                    Current password*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      id="cpass"
                      placeholder="Current Password"
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="npass" className="col-sm-3 col-form-label">
                    New password*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="npass"
                      name="newPassword"
                      placeholder="New Password"
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="cfpass" className="col-sm-3 col-form-label">
                    Confirm new password*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="cfpass"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  </div>
                </Form.Group>
                <button className="btn btn-rounded btn-lg">Save Changes</button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
}
