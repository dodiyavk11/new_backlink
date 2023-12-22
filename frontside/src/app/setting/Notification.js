import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Form } from "react-bootstrap";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import "../../assets/custom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiServices from "../services/api.service";
import { Trans } from "react-i18next";

export class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationData: [],
    };
    this.checkboxRefs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleDisableAll = () => {
    Object.values(this.checkboxRefs).forEach((checkboxRef) => {
      checkboxRef.checked = false;
    });
    const updatedNotificationData = {
      ...this.state.notificationData,
      email_message_received: 0,
      email_order_accepted: 0,
      email_order_completed: 0,
      email_order_created: 0,
      email_order_declined: 0,
      email_order_missing_details: 0,
      email_payment_failed: 0,
      email_payment_reminder: 0,
      email_payment_succeeded: 0,
      email_recommendations_available: 0,
    };

    this.setState({ notificationData: updatedNotificationData });
  };

  componentDidMount() {
    this.getNotification();
  }

  getNotification = () => {
    ApiServices.getNotificationSetting().then(
      (res) => {
        if (res.data.status) {
          this.setState({
            notificationData: res.data.data,
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
      notificationData: {
        ...prevState.notificationData,
        [name]: prevState.notificationData[name] === 1 ? 0 : 1,
      },
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.patchUpdateNotification();
  };
  patchUpdateNotification = () => {
    const formDatas = new FormData();
    const { notificationData } = this.state;
    delete notificationData.user;
    Object.keys(notificationData).forEach((key) => {
      formDatas.append(key, notificationData[key]);
    });

    ApiServices.updateNotificationSetting(formDatas).then(
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
    const { notificationData } = this.state;
    return (
      <div className="notificationTab">
        <ToastContainer />
        <form
          className="notificationForm"
          id="notificationForm"
          onSubmit={this.handleSubmit}
        >
          <Box className="mt-4">
            <Card variant="outlined">
              {" "}
              <CardContent>
                <div className="row mb-2">
                  <div className="col-sm-8">
                    <div className="mt-2">
                      <h5>
                        <Trans>Notifications</Trans>
                      </h5>
                    </div>
                  </div>
                  <div className="col-sm-4 text-right">
                    <button
                      type="button"
                      className="btn p-2 planRound fontBold500"
                      id="disableAll"
                      onClick={this.handleDisableAll}
                    >
                      <Trans>Disable all</Trans>
                    </button>
                  </div>
                </div>
                <Form.Group className="row">
                  <label htmlFor="oacpt" className="col-sm-8 col-form-label">
                    <Trans>Order accepted</Trans>
                    <Typography className="customText">
                      <Trans>
                        You will receive this email as soon as the publisher has
                        accepted your order.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="oacpt"
                        name="orderAccepted"
                        ref={(ref) =>
                          (this.checkboxRefs["orderAccepted"] = ref)
                        }
                        checked={notificationData["email_order_accepted"] === 1}
                        value={notificationData["email_order_accepted"]}
                        onChange={() =>
                          this.handleCheckboxChange("email_order_accepted")
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="ocomp" className="col-sm-8 col-form-label">
                    <Trans>Order completed</Trans>
                    <Typography className="customText">
                      <Trans>
                        You will receive this email as soon as your order has
                        been completed. Enclosed you will find the report for
                        your order.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="ocomp"
                        name="email_order_completed"
                        ref={(ref) =>
                          (this.checkboxRefs["email_order_completed"] = ref)
                        }
                        checked={
                          notificationData["email_order_completed"] === 1
                        }
                        onChange={() =>
                          this.handleCheckboxChange("email_order_completed")
                        }
                        value={notificationData["email_order_completed"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="ocrt" className="col-sm-8 col-form-label">
                    <Trans>Order created</Trans>
                    <Typography className="customText">
                      <Trans>
                        {" "}
                        You will receive this email when we have received your
                        order.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="ocrt"
                        name="email_order_created"
                        ref={(ref) =>
                          (this.checkboxRefs["email_order_created"] = ref)
                        }
                        checked={notificationData["email_order_created"] === 1}
                        onChange={() =>
                          this.handleCheckboxChange("email_order_created")
                        }
                        value={notificationData["email_order_created"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="odcl" className="col-sm-8 col-form-label">
                    <Trans>Order declined</Trans>
                    <Typography className="customText">
                      <Trans>
                        You will redeive this email if the publisher has
                        declined you order.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="odcl"
                        name="email_order_declined"
                        ref={(ref) =>
                          (this.checkboxRefs["email_order_declined"] = ref)
                        }
                        checked={notificationData["email_order_declined"] === 1}
                        onChange={() =>
                          this.handleCheckboxChange("email_order_declined")
                        }
                        value={notificationData["email_order_declined"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="oadd" className="col-sm-8 col-form-label">
                    <Trans>Order requires additional details</Trans>
                    <Typography className="customText">
                      You will receive this email in case our team need more
                      details regarding your order.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="oadd"
                        name="email_order_missing_details"
                        ref={(ref) =>
                          (this.checkboxRefs["email_order_missing_details"] =
                            ref)
                        }
                        checked={
                          notificationData["email_order_missing_details"] === 1
                        }
                        onChange={() =>
                          this.handleCheckboxChange(
                            "email_order_missing_details"
                          )
                        }
                        value={notificationData["email_order_missing_details"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="payf" className="col-sm-8 col-form-label">
                    <Trans>Payment failed</Trans>
                    <Typography className="customText">
                      <Trans>
                        You will recieve this email if your pament failed.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="payf"
                        name="email_payment_failed"
                        ref={(ref) =>
                          (this.checkboxRefs["email_payment_failed"] = ref)
                        }
                        checked={notificationData["email_payment_failed"] === 1}
                        onChange={() =>
                          this.handleCheckboxChange("email_payment_failed")
                        }
                        value={notificationData["email_payment_failed"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="pays" className="col-sm-8 col-form-label">
                    <Trans>Payment successful</Trans>
                    <Typography className="customText">
                      <Trans>
                        You will receive this email if your payment was
                        successful. Attached you will find the payment
                        confirmation.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="pays"
                        name="email_payment_succeeded"
                        ref={(ref) =>
                          (this.checkboxRefs["email_payment_succeeded"] = ref)
                        }
                        checked={
                          notificationData["email_payment_succeeded"] === 1
                        }
                        onChange={() =>
                          this.handleCheckboxChange("email_payment_succeeded")
                        }
                        value={notificationData["email_payment_succeeded"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="payrem" className="col-sm-8 col-form-label">
                    <Trans>Payment reminder</Trans>
                    <Typography className="customText">
                      <Trans>
                        You will receive this email if your payment hasn't
                        processed withing three days.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="payrem"
                        name="email_payment_reminder"
                        ref={(ref) =>
                          (this.checkboxRefs["email_payment_reminder"] = ref)
                        }
                        checked={
                          notificationData["email_payment_reminder"] === 1
                        }
                        onChange={() =>
                          this.handleCheckboxChange("email_payment_reminder")
                        }
                        value={notificationData["email_payment_reminder"]}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="newrec" className="col-sm-8 col-form-label">
                    <Trans>New recommendations</Trans>
                    <Typography className="customText">
                      <Trans>
                        When one of your project gets a new recommendation, you
                        will receive this email.
                      </Trans>
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="newrec"
                        name="email_recommendations_available"
                        ref={(ref) =>
                          (this.checkboxRefs[
                            "email_recommendations_available"
                          ] = ref)
                        }
                        checked={
                          notificationData[
                            "email_recommendations_available"
                          ] === 1
                        }
                        onChange={() =>
                          this.handleCheckboxChange(
                            "email_recommendations_available"
                          )
                        }
                        value={
                          notificationData["email_recommendations_available"]
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
              </CardContent>
            </Card>
          </Box>
          <button type="submit" className="btn btn-rounded btn-lg mt-4">
            <Trans>Save Changes</Trans>
          </button>
        </form>
      </div>
    );
  }
}
