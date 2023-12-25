import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import { Trans } from "react-i18next";
import TimeAgo from "timeago-react";
import "../../../assets/custom.css";

export class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: [],
    };
  }

  componentDidMount() {
    ApiServices.getPublisherMessageList()
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (res.data.data) {
            this.setState({ messageData: res.data.data });
          }
        }
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          this.props.history.push("/login");
        } else {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
  }

  goToOrderViewLink = (order_id) => {
    this.props.history.push(`/publisher/order/${order_id}`);
  };

  render() {
    const { messageData } = this.state;

    return (
      <div className="ordersListPage">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Order messages</Trans>
            </h3>
          </div>
          <ToastContainer />
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                {messageData.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover orderListTable">
                      <thead>
                        <tr>
                          <th>
                            <Trans>Sr</Trans>
                          </th>
                          <th>
                            <Trans>Domain</Trans>
                          </th>
                          <th>
                            <Trans>Last message</Trans>
                          </th>
                          <th>
                            <Trans>Time</Trans>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {messageData.map((message, index) => {
                          const parts = message.message.split(",,");
                          const msg = parts[0].trim();
                          const created_at = parts[1].trim();

                          return (
                            <tr
                              key={index}
                              onClick={() =>
                                this.goToOrderViewLink(message.order_id)
                              }
                            >
                              <td>{index + 1}</td>
                              <td>{message.order.domain.domain_name}</td>
                              <td>{msg}</td>
                              <td>
                                <TimeAgo datetime={created_at} locale="en" />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="">
                    <center>
                      <div className="mt-5 mx-auto">
                        <img
                          src={require("../../../assets/images/empty.png")}
                          alt="No data found..."
                        />
                      </div>
                      <h4>
                        <Trans>No orders with have any message</Trans>
                      </h4>
                      <p style={{ maxWidth: "400px" }}>
                        <Trans>
                          No Project You do not have any Project yet. As soon as
                          you add your first Project, it will show up here.
                        </Trans>
                      </p>
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Messages);
