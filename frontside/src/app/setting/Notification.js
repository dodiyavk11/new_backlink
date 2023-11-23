import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Form } from "react-bootstrap";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import "../../assets/custom.css";

export class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.checkboxRefs = {};
  }
  handleDisableAll = () => {
    Object.values(this.checkboxRefs).forEach((checkboxRef) => {
      checkboxRef.checked = false;
    });
  };
  render() {
    return (
      <div className="notificationTab">
        <Box className="mt-4">
          <Card variant="outlined">
            {" "}
            <CardContent>
              <div className="row mb-2">
                <div className="col-sm-8">
                  <div className="mt-2">
                    <h5>Notifications</h5>
                  </div>
                </div>
                <div className="col-sm-4 text-right">
                  <button
                    className="btn p-2 planRound fontBold500"
                    id="disableAll"
                    onClick={this.handleDisableAll}
                  >
                    Disable all
                  </button>
                </div>
              </div>
              <form className="notificationForm" id="notificationForm">
                <Form.Group className="row">
                  <label htmlFor="oacpt" className="col-sm-8 col-form-label">
                    Order accepted
                    <Typography className="customText">
                      You will receive this email as soon as the publisher has
                      accepted your order.
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
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="ocomp" className="col-sm-8 col-form-label">
                    Order completed
                    <Typography className="customText">
                      You will receive this email as soon as your order has been
                      completed. Enclosed you will find the report for your
                      order.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="ocomp"
                        name="orderCompleted"
                        ref={(ref) =>
                          (this.checkboxRefs["orderCompleted"] = ref)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="ocrt" className="col-sm-8 col-form-label">
                    Order created
                    <Typography className="customText">
                      You will receive this email when we have received your
                      order.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="ocrt"
                        name="orderCreated"
                        ref={(ref) => (this.checkboxRefs["orderCreated"] = ref)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="odcl" className="col-sm-8 col-form-label">
                    Order declined
                    <Typography className="customText">
                      You will redeive this email if the publisher has declined
                      you order.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="odcl"
                        name="orderDeclined"
                        ref={(ref) =>
                          (this.checkboxRefs["orderDeclined"] = ref)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="oadd" className="col-sm-8 col-form-label">
                    Order requires additional details
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
                        name="orderAddDetails"
                        ref={(ref) =>
                          (this.checkboxRefs["orderAddDetails"] = ref)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="payf" className="col-sm-8 col-form-label">
                    Payment failed
                    <Typography className="customText">
                      You will recieve this email if your pament failed.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="payf"
                        name="paymentFailed"
                        ref={(ref) =>
                          (this.checkboxRefs["paymentFailed"] = ref)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="pays" className="col-sm-8 col-form-label">
                    Payment successful
                    <Typography className="customText">
                      You will receive this email if your payment was
                      successful. Attached you will find the payment
                      confirmation.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="pays"
                        name="paymentSuccess"
                        ref={(ref) =>
                          (this.checkboxRefs["paymentSuccess"] = ref)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="payrem" className="col-sm-8 col-form-label">
                    Payment reminder
                    <Typography className="customText">
                      You will receive this email if your payment hasn't
                      processed withing three days.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="payrem"
                        name="paymentReminder"
                        ref={(ref) =>
                          (this.checkboxRefs["paymentReminder"] = ref)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
                <Divider />
                <Form.Group className="row">
                  <label htmlFor="newrec" className="col-sm-8 col-form-label">
                    New recommendations
                    <Typography className="customText">
                      When one of your project gets a new recommendation, you
                      will receive this email.
                    </Typography>
                  </label>
                  <div className="col-sm-4 text-right mt-4">
                    <label className="switch mr-2">
                      <input
                        type="checkbox"
                        id="newrec"
                        name="newRecommend"
                        ref={(ref) => (this.checkboxRefs["newRecommend"] = ref)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Form.Group>
              </form>
            </CardContent>
          </Card>
        </Box>
        <button className="btn btn-rounded btn-lg mt-4">Save Changes</button>
      </div>
    );
  }
}
