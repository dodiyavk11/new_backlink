import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { CPopover, CButton } from "@coreui/react";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import { Form } from "react-bootstrap";
import "../../assets/custom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiServices from "../services/api.service";

export class ProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
      formData: {},
    };
  }
  componentDidMount() {
    this.getProfile();
  }
  getProfile = () => {
    ApiServices.getProfileData().then(
      (res) => {
        if (res.data.status) {
          this.setState({
            profileData: res.data.data,
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
  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      profileData: {
        ...prevState.profileData,
        [name]: value,
      },
    }));
  };
  handleClick = () => {
    this.props.updateTabValue("2");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    const { profileData } = this.state;
    Object.keys(profileData).forEach((key) => {
      formDatas.append(key, profileData[key]);
    });
    formDatas.append("password", "");
    ApiServices.updateProfileData(formDatas).then(
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

  render() {
    const { formData, profileData } = this.state;
    return (
      <div className="profileTabData">
        <form className="forms-sample" onSubmit={this.handleSubmit}>
          <Box>
            <Card variant="outlined">
              {" "}
              <ToastContainer/>
              <CardContent>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mt-2">
                      <h5>Personal information</h5>
                    </div>
                  </div>
                </div>
                <Form.Group className="row">
                  <label htmlFor="demail" className="col-sm-3 col-form-label">
                    <Typography className="customText2">
                      Email address
                    </Typography>
                    <Typography className="customText">
                      You can change your email address{" "}
                      <Link  onClick={this.handleClick}
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
                      className="form-control mt-4"
                      id="demail"
                      placeholder="Email"
                      value={formData.email || profileData.email || ""}
                      onChange={this.handleFormChange}
                    />
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row mt-3">
                  <label htmlFor="fname" className="col-sm-3 col-form-label">
                    Firstname*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="firstName"
                      className="form-control"
                      id="fname"
                      placeholder="Firstname"
                      value={formData.firstName || profileData.firstName || ""}
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="lname" className="col-sm-3 col-form-label">
                    Lastname*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      name="lastName"
                      type="text"
                      className="form-control"
                      id="lname"
                      placeholder="Lastname"
                      value={formData.lastName || profileData.lastName || ""}
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="address" className="col-sm-3 col-form-label">
                    Address*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="address"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={formData.address || profileData.address || ""}
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="pcode" className="col-sm-3 col-form-label">
                    Postal code*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="number"
                      name="postal_code"
                      className="form-control"
                      id="pcode"
                      placeholder="12345"
                      value={
                        formData.postal_code || profileData.postal_code || ""
                      }
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="city" className="col-sm-3 col-form-label">
                    City*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="city"
                      className="form-control"
                      id="city"
                      placeholder="New York"
                      value={formData.city || profileData.city || ""}
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="country" className="col-sm-3 col-form-label">
                    {" "}
                    Country*
                    <Typography className="customText">
                      To change the country of the billing address, please
                      contact us at support@backlinked.de.
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
                  <label htmlFor="pnumber" className="col-sm-3 col-form-label">
                    {" "}
                    Phone Number*
                    <Typography className="customText">
                      By providing your phone number we can reach you faster in
                      case of issues.
                    </Typography>
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="phone"
                      className="form-control mt-4"
                      id="pnumber"
                      value={formData.phone || profileData.phone || ""}
                      onChange={this.handleFormChange}
                    />
                  </div>
                </Form.Group>
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
                        To change your company information, please contact us at
                        support@backlinked.de.
                      </Typography>
                    </div>
                  </div>
                </div>
                <Form.Group className="row mt-3">
                  <label htmlFor="cname" className="col-sm-3 col-form-label">
                    Company name*
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="company"
                      className="form-control"
                      id="cname"
                      placeholder="Test"
                      value={formData.company || profileData.company || ""}
                      onChange={this.handleFormChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Divider className="mt-3" />
                <Form.Group className="row mt-3">
                  <label htmlFor="vat" className="col-sm-3 col-form-label">
                    Vat ID*
                    <Typography className="customText">
                      Mandatory for customers outside of Germany
                    </Typography>
                  </label>
                  <div className="col-sm-9">
                    <Form.Control
                      type="text"
                      name="vat_id"
                      className="form-control"
                      id="vat"
                      placeholder="Vat ID"
                      value={formData.vat_id || profileData.vat_id || ""}
                      onChange={this.handleFormChange}
                    />
                  </div>
                </Form.Group>
              </CardContent>
            </Card>
          </Box>
          <button type="submit" className="btn btn-rounded mt-4">
            Save Change
          </button>
        </form>
      </div>
    );
  }
}
