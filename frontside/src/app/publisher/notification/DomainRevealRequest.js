import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";
import TimeAgo from "timeago-react";
import AdminBack from "../../shared/AdminBack";
import "../../../assets/custom.css";

export class DomainRevealRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: [],
    };
  }

  handleAction = (id, status) => {
    console.log(id, status);
    const data = { id, status };
    ApiServices.publisherUpdateRevealRequest(data)
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success(<Trans>Request update success</Trans>, {
            position: "top-center",
            autoClose: 2000,
          });
          this.getRequestData();
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
  };

  getRequestData = () => {
    ApiServices.getPublisherRevealRequest()
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (res.data.data) {
            this.setState({ requestData: res.data.data });
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
  };

  componentDidMount() {
    this.getRequestData();
  }

  goToOrderViewLink = (order_id) => {
    this.props.publisherReadMessage(order_id);
    this.props.history.push(`/publisher/order/${order_id}`);
  };

  render() {
    const { requestData } = this.state;

    return (
      <div className="ordersListPage">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Reveal Domain Request</Trans> <AdminBack />
            </h3>
          </div>
          <ToastContainer />
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                {requestData.length > 0 ? (
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
                            <Trans>Messages</Trans>
                          </th>
                          <th>
                            <Trans>Status</Trans>
                          </th>
                          <th>
                            <Trans>Time</Trans>
                          </th>
                          <th>
                            <Trans>Action</Trans>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestData.map((data, index) => {
                          return (
                            <tr
                              key={index}
                              // onClick={() => this.goToOrderViewLink(data.id)}
                            >
                              <td>{index + 1}</td>
                              <td>{data.domain_name}</td>
                              <td>{data.domainRequest[0].message}</td>
                              <td>
                                {data.domainRequest[0].status === 0 ? (
                                  <span>
                                    <Trans>Pending</Trans>
                                  </span>
                                ) : data.domainRequest[0].status === 1 ? (
                                  <span>
                                    <Trans>Accepted</Trans>
                                  </span>
                                ) : (
                                  <span>
                                    <Trans>Declined</Trans>
                                  </span>
                                )}
                              </td>
                              <td>
                                <TimeAgo
                                  datetime={data.domainRequest[0].created_at}
                                  locale="en"
                                />
                              </td>
                              <td>
                                <div>
                                  <i
                                    className="mdi mdi-check-circle"
                                    title="Accept"
                                    style={{
                                      color: "#ff9756",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      fontSize: "25px",
                                    }}
                                    onClick={() =>
                                      this.handleAction(
                                        data.domainRequest[0].id,
                                        1
                                      )
                                    }
                                  ></i>
                                  <i
                                    className="mdi mdi-close-circle"
                                    title="Decline"
                                    onClick={() =>
                                      this.handleAction(
                                        data.domainRequest[0].id,
                                        2
                                      )
                                    }
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      fontSize: "25px",
                                    }}
                                  ></i>
                                </div>
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
                        <Trans>No Domain reveal request</Trans>
                      </h4>
                      <p style={{ maxWidth: "400px" }}></p>
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
export default withRouter(DomainRevealRequest);
