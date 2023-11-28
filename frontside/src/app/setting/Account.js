import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Form } from "react-bootstrap";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiServices from "../services/api.service";
import "../../assets/custom.css";
export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
      formData: {},
      newEmail: "",
      reEmail: "",
      password: "",
      invoice_email: "",
      bulk_invoice:false,
      currentPassword:"",
      newPassword:"",
      confirmPassword:"",
    };
  }
  componentDidMount() {
    this.getProfile();
  }
  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [name]: value,
    }));
  };
  getProfile = () => {
    ApiServices.getProfileData().then(
      (res) => {
        if (res.data.status) {
          this.setState({
            profileData: res.data.data,
            bulk_invoice:res.data.data.bulk_invoice,
            invoice_email:res.data.data.invoice_email,
          });
        }
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

  handleSubmitUpdateEmail = (e) => {
    e.preventDefault();
    const { newEmail, reEmail, password } = this.state;
    if (newEmail !== reEmail) {
      toast.error("The email address confirmation does not match.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const updateData = JSON.stringify({
      email: newEmail,
      confrim: reEmail,
      password,
    });
    this.updateRequest(updateData, "account/user/email");
    this.setState({
      newEmail: "",
      reEmail: "",
      password: "",
    });
  };
  handleSubmitInvoiceSetting = (e) => {
    e.preventDefault();
    const { bulk_invoice, invoice_email} = this.state;    
    const updateData = JSON.stringify({
      bulk_invoice,
      invoice_email,
    });
    this.updateRequest(updateData, "account/user/billingSetting");    
  };
  
  handleSubmitUpdatePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword,confirmPassword } = this.state;    
    if (confirmPassword !== newPassword) {
      toast.error("The New password confirmation does not match.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const updateData = JSON.stringify({
      currentPassword,
      newPassword,
      confirmPassword
    });
    this.updateRequest(updateData, "account/user/change-password");    
  };

  updateRequest = (formDatas, url) => {
    ApiServices.customProfileUpdateData(formDatas, url).then(
      (res) => {
        if (res.data.status) {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
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
  handleCheckboxChange = (name) => {
    this.setState((prevState) => ({
      [name]: prevState[name] === 1 ? 0 : 1,
    }));
  };
  render() {
    const { profileData } = this.state;
    return (
      <div className="accountTabData">
        <Box>
          <Card variant="outlined">
            {" "}
            <ToastContainer />
            <CardContent>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mt-2">
                    <h5>Update e-mail address</h5>
                  </div>
                </div>
              </div>
              <form
                className="updateEmailForm"
                id="updateEmailForm"
                onSubmit={this.handleSubmitUpdateEmail}
              >
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
                      onChange={this.handleFormChange}
                      value={this.state.newEmail}
                      required
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
                      onChange={this.handleFormChange}
                      value={this.state.reEmail}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row mt-3">
                  <label htmlFor="remail" className="col-sm-3 col-form-label">
                    Password*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleFormChange}
                      value={this.state.password}
                      required
                    />
                  </div>
                </Form.Group>
                <button type="submit" className="btn btn-rounded btn-lg">
                  Save Changes
                </button>
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
              <form className="invoiceSettingForm" id="invoiceSettingForm" onSubmit={this.handleSubmitInvoiceSetting}>
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
                      <input
                        type="checkbox"
                        id="binvoice"
                        name="bulk_invoice"
                        checked={this.state.bulk_invoice === 1}
                        onChange={() => this.handleCheckboxChange("bulk_invoice")}
                        value={this.state.bulk_invoice}                  
                      />
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
                      name="invoice_email"
                      className="form-control"
                      id="iemail"
                      placeholder="demo.user@fairlinked.com"
                      value={
                        this.state.invoice_email ||
                        profileData.invoice_email ||
                        ""
                      }
                      onChange={this.handleFormChange}
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
              <form className="chnagepasswordForm" id="chnagepasswordForm" onSubmit={this.handleSubmitUpdatePassword}>
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
                      onChange={this.handleFormChange}
                      value={this.state.currentPassword}
                      required
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
                      onChange={this.handleFormChange}
                      value={this.state.newPassword}
                      required
                    />
                    {this.state.newPassword.length > 0 && this.state.newPassword.length < 8 && (
                      <span style={{ color: 'red' }}>Password must be at least 8 characters long</span>
                    )}
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
                      onChange={this.handleFormChange}
                      value={this.state.confirmPassword}
                      required                      
                    />
                    {this.state.confirmPassword.length > 0 && this.state.confirmPassword.length < 8 && (
                      <span style={{ color: 'red' }}>Password must be at least 8 characters long</span>
                    )}
                  </div>
                </Form.Group>
                <button type="submit" className="btn btn-rounded btn-lg">Save Changes</button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
}
