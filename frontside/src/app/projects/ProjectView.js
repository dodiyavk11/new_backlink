import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
import Tooltip from "@material-ui/core/Tooltip";
import TimeAgo from "timeago-react";
import ApiServices from "../services/api.service";
import { Trans } from "react-i18next";
import CurrencyFormatter from "../shared/CurrencyFormatter";

export class ProjectView extends Component {
  constructor(props) {
    const { hash_id } = props.match.params;
    super(props);
    this.state = {
      contentData: [],
      orderData: [],
      contentInsideData: [],
      category: [],
      monthlyBudget: 0,
      hash_id: hash_id,
      domain_id: 0,
      data: {
        labels: [
          "Jan 23",
          "Feb 23",
          "Mar 23",
          "Apr 23",
          "May 23",
          "Jun 23",
          "July 23",
          " Aug 23",
          "Sep 23",
          "Oct 23",
          "Nov 23",
          " Dec 23",
        ],
        datasets: [
          {
            data: [1, 15, 2, 35, 5, 80, 7, 8, 9, 10, 2, 36],
            borderColor: "rgb(255, 151, 86)",
            lineTension: 0.2,
          },
        ],
      },
      hoveredValue: null,
      hoverLabel: null,
    };
  }

  handleHover = (event, chartElements, type) => {
    if (chartElements.length > 0) {
      const datasetIndex = chartElements[0]._datasetIndex;
      const dataIndex = chartElements[0]._index;
      const value = this.state.data.datasets[datasetIndex].data[dataIndex];
      const label = this.state.data.labels[dataIndex];
      this.setState({ hoveredValue: value });
      this.setState({ hoverLabel: label });
    } else {
      this.setState({ hoveredValue: null });
      this.setState({ hoverLabel: null });
    }
  };
  viewOrder = (order_id) => {
    this.props.history.push(`/order/${order_id}`);
  };
  handleGoBack = () => {
    this.props.history.goBack();
  };

  addToArchive = (status, hash_id) => {
    ApiServices.userProjectUpdateToArchive(status, hash_id)
      .then((res) => {
        if (res.status) {
          this.getProjecViewtData();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          AuthService.logout();
          this.props.history.push("/login");
        } else {
          if (err.response) {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        }
      });
  };
  handleInputChange = (event) => {
    this.setState({
      monthlyBudget: event.target.value,
    });
  };

  handleCallClick = () => {
    window.location.href = `tel:+911234567890`;
  };
  updateMonthlyBudget = () => {
    const { monthlyBudget, domain_id, hash_id } = this.state;
    const formData = {
      budget: monthlyBudget,
      id: domain_id,
      hash_id: hash_id,
    };
    ApiServices.updateMonthlyBudget(formData)
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          AuthService.logout();
          this.props.history.push("/login");
        } else {
          if (err.response) {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        }
      });
  };

  getProjecViewtData = () => {
    ApiServices.getProjectViewData(this.state.hash_id)
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({
            contentData: res.data.data,
            domain_id: res.data.data.id,
            monthlyBudget: res.data.data.budget,
          });
          if (res.data.data.category) {
            this.setState({ category: res.data.data.category });
          }
          if (res.data.data.orderData) {
            this.setState({ orderData: res.data.data.orderData });
          }
          if (res.data.data.contentData) {
            this.setState({ contentInsideData: res.data.data.contentData });
          }
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          AuthService.logout();
          this.props.history.push("/login");
        } else {
          if (err.response) {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        }
      });
  };

  componentDidMount() {
    this.getProjecViewtData();
  }

  render() {
    const { contentData, category, contentInsideData, orderData } = this.state;
    const getStatusClass = (status) => {
      switch (status) {
        case "Pending":
          return "badge-primary";
        case "Completed":
          return "badge-success";
        case "Cancelled":
          return "badge-danger";
        case "Rejected":
          return "badge-warning";
        case "Inprogress":
          return "badge-secondary";
        default:
          return "badge-info";
      }
    };
    if (!contentData) {
      return (
        <div className="text-danger">
          Data Not Found.
          <button
            className="btn btn-outline-primary btn-icon-text"
            onClick={this.handleGoBack}
          >
            Back
          </button>
        </div>
      );
    }
    return (
      <div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-8 grid-margin">
            <div className="card">
              <div className="card-img-top d-flex flex-row justify-content-between p-4">
                <button
                  className="btn btn-rounded font-weight-medium auth-form-btn"
                  onClick={this.handleGoBack}
                >
                  <i className="mdi mdi-arrow-left"></i> <Trans>Back</Trans>
                </button>
                <button
                  className="btn btn-rounded font-weight-medium auth-form-btn"
                  onClick={() =>
                    this.addToArchive(
                      contentData.isArchieved ? 0 : 1,
                      contentData.hash_id
                    )
                  }
                >
                  <i className="mdi mdi-archive"></i>{" "}
                  {contentData.isArchieved ? "Unarchive" : "Archive"}
                </button>
              </div>
              <div className="card-body dashboardCard">
                <h2 className="h2">Domain: {contentData.domain_name}</h2>
                <div className="flex flex-wrap mt-4 gap-2">
                  <div className="px-3 py-2 catContent items-center justify-center">
                    {category.name}
                  </div>
                </div>
                <hr />
                <div className="row g-2">
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="border">
                      <div className="p-3 d-flex flex-row justify-content-between">
                        <div>
                          <b>
                            <Trans>Visibility index</Trans>
                          </b>
                        </div>
                        <div>
                          <img
                            alt="Metrics"
                            src={require("../../assets/images/project/metrics.svg")}
                            className="rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </div>
                      </div>
                      <div className="dataInside">
                        <span className="p-3 h3">
                          {/* {contentInsideData.visibility_index}                           */}
                          {this.state.hoveredValue !== null
                            ? this.state.hoveredValue
                            : contentInsideData.visibility_index}
                        </span>
                        <p style={{ paddingLeft: "18px" }}>
                          <span className="h6">
                            {this.state.hoverLabel !== null
                              ? this.state.hoverLabel
                              : this.state.data.labels[0]}
                          </span>
                        </p>
                        <Line
                          data={this.state.data}
                          options={{
                            onHover: (event, chartElements) =>
                              this.handleHover(event, chartElements, "vIndex"),
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              enabled: false,
                              // callbacks: {
                              //   label: function (tooltipItem) {
                              //     return tooltipItem.yLabel;
                              //   },
                              // },
                            },
                            scales: {
                              yAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                              xAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                            },
                          }}
                          ref={(ref) => (this.chartRef = ref)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="border">
                      <div className="p-3 d-flex flex-row justify-content-between">
                        <div>
                          <b>
                            <Trans>Domain Rating</Trans>
                          </b>
                        </div>
                        <div>
                          <img
                            alt="ahrefs"
                            src={require("../../assets/images/project/ahrefs.svg")}
                            className="rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </div>
                      </div>
                      <div className="dataInside">
                        <span className="p-3 h3">
                          {/* {contentInsideData.visibility_index}                           */}
                          {this.state.hoveredValue !== null
                            ? this.state.hoveredValue
                            : contentInsideData.domain_rating}
                        </span>
                        <p style={{ paddingLeft: "18px" }}>
                          <span className="h6">
                            {this.state.hoverLabel !== null
                              ? this.state.hoverLabel
                              : this.state.data.labels[0]}
                          </span>
                        </p>
                        <Line
                          data={this.state.data}
                          options={{
                            onHover: (event, chartElements) =>
                              this.handleHover(event, chartElements, "dRating"),
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              enabled: false,
                              // callbacks: {
                              //   label: function (tooltipItem) {
                              //     return tooltipItem.yLabel;
                              //   },
                              // },
                            },
                            scales: {
                              yAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                              xAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                            },
                          }}
                          ref={(ref) => (this.chartRef = ref)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="border">
                      <div className="p-3 d-flex flex-row justify-content-between">
                        <div>
                          <b>
                            <Trans>Referring Domains</Trans>
                          </b>
                        </div>
                        <div>
                          <img
                            alt="ahrefs"
                            src={require("../../assets/images/project/ahrefs.svg")}
                            className="rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </div>
                      </div>
                      <div className="dataInside">
                        <span className="p-3 h3">
                          {/* {contentInsideData.visibility_index}                           */}
                          {this.state.hoveredValue !== null
                            ? this.state.hoveredValue
                            : contentInsideData.referring}
                        </span>
                        <p style={{ paddingLeft: "18px" }}>
                          <span className="h6">
                            {this.state.hoverLabel !== null
                              ? this.state.hoverLabel
                              : this.state.data.labels[0]}
                          </span>
                        </p>
                        <Line
                          data={this.state.data}
                          options={{
                            onHover: (event, chartElements) =>
                              this.handleHover(event, chartElements, "rDomain"),
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              enabled: false,
                              // callbacks: {
                              //   label: function (tooltipItem) {
                              //     return tooltipItem.yLabel;
                              //   },
                              // },
                            },
                            scales: {
                              yAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                              xAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                            },
                          }}
                          ref={(ref) => (this.chartRef = ref)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-2 mt-2">
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="border">
                      <div className="p-3 d-flex flex-row justify-content-between">
                        <div>
                          <b>
                            <Trans>Citation Flow</Trans>
                          </b>
                        </div>
                        <div>
                          <img
                            alt="majestic"
                            src={require("../../assets/images/project/majestic.svg")}
                            className="rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </div>
                      </div>
                      <div className="dataInside">
                        <span className="p-3 h3">
                          {/* {contentInsideData.visibility_index}                           */}
                          {this.state.hoveredValue !== null
                            ? this.state.hoveredValue
                            : contentInsideData.citation_flow}
                        </span>
                        <p style={{ paddingLeft: "18px" }}>
                          <span className="h6">
                            {this.state.hoverLabel !== null
                              ? this.state.hoverLabel
                              : this.state.data.labels[0]}
                          </span>
                        </p>
                        <Line
                          data={this.state.data}
                          options={{
                            onHover: (event, chartElements) =>
                              this.handleHover(event, chartElements, "cFlow"),
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              enabled: false,
                              // callbacks: {
                              //   label: function (tooltipItem) {
                              //     return tooltipItem.yLabel;
                              //   },
                              // },
                            },
                            scales: {
                              yAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                              xAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                            },
                          }}
                          ref={(ref) => (this.chartRef = ref)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="border">
                      <div className="p-3 d-flex flex-row justify-content-between">
                        <div>
                          <b>
                            <Trans>Trust Flow</Trans>
                          </b>
                        </div>
                        <div>
                          <img
                            alt="majestic"
                            src={require("../../assets/images/project/majestic.svg")}
                            className="rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </div>
                      </div>
                      <div className="dataInside">
                        <span className="p-3 h3">
                          {/* {contentInsideData.visibility_index}                           */}
                          {this.state.hoveredValue !== null
                            ? this.state.hoveredValue
                            : contentInsideData.trust_flow}
                        </span>
                        <p style={{ paddingLeft: "18px" }}>
                          <span className="h6">
                            {this.state.hoverLabel !== null
                              ? this.state.hoverLabel
                              : this.state.data.labels[0]}
                          </span>
                        </p>
                        <Line
                          data={this.state.data}
                          options={{
                            onHover: (event, chartElements) =>
                              this.handleHover(event, chartElements, "tFlow"),
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              enabled: false,
                              // callbacks: {
                              //   label: function (tooltipItem) {
                              //     return tooltipItem.yLabel;
                              //   },
                              // },
                            },
                            scales: {
                              yAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                              xAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                            },
                          }}
                          ref={(ref) => (this.chartRef = ref)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="border">
                      <div className="p-3 d-flex flex-row justify-content-between">
                        <div>
                          <b>
                            <Trans>Domain Authority</Trans>
                          </b>
                        </div>
                        <div>
                          <img
                            alt="moz"
                            src={require("../../assets/images/project/moz.svg")}
                            className="rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </div>
                      </div>
                      <div className="dataInside">
                        <span className="p-3 h3">
                          {/* {contentInsideData.visibility_index}                           */}
                          {this.state.hoveredValue !== null
                            ? this.state.hoveredValue
                            : contentInsideData.authority}
                        </span>
                        <p style={{ paddingLeft: "18px" }}>
                          <span className="h6">
                            {this.state.hoverLabel !== null
                              ? this.state.hoverLabel
                              : this.state.data.labels[0]}
                          </span>
                        </p>
                        <Line
                          data={this.state.data}
                          options={{
                            onHover: (event, chartElements) =>
                              this.handleHover(
                                event,
                                chartElements,
                                "dAuthority"
                              ),
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              enabled: false,
                              // callbacks: {
                              //   label: function (tooltipItem) {
                              //     return tooltipItem.yLabel;
                              //   },
                              // },
                            },
                            scales: {
                              yAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                              xAxes: [
                                {
                                  gridLines: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                    maxTicksLimit: 10,
                                  },
                                },
                              ],
                            },
                          }}
                          ref={(ref) => (this.chartRef = ref)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-2 mt-4 pl-3">
                  <div className="col-sm-12 border bRadius">
                    <div className="mt-2 mb-2 p-2 dashboardHome">
                      <h4 className="card-title"><Trans>Orders</Trans></h4>
                      <hr />
                      {orderData.map((order) => (
                        <div className="card" key={order.id}>
                          <div
                            className="card-body"
                            style={{ padding: "1.5rem 0.5rem" }}
                          >
                            <table>
                              <tbody>
                                <tr onClick={() => this.viewOrder(order.id)}>
                                  <td>
                                    <h4>
                                      {order.domain
                                        ? order.domain.domain_name
                                        : "Link Bundle"}
                                    </h4>
                                    <div className="extraInfo flex-wrap d-flex justify-content-between">
                                      <div>
                                        {contentData.domain_name
                                          ? contentData.domain_name
                                          : "No project"}
                                      </div>

                                      <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                                      <span
                                        style={{ padding: "3px" }}
                                        className={`badge ${getStatusClass(
                                          order.status
                                        )}`}
                                      >
                                        {order.status}
                                      </span>
                                      <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                                      <div>{CurrencyFormatter.formatCurrency(order.total_price)}</div>
                                      <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                                      <div>
                                        <TimeAgo
                                          datetime={order.created_at}
                                          locale="en"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                      {!orderData.length && (
                        <div className="card">
                          <div className="card-body dashboardCard">
                            <h4 className="text-center">
                              <Trans>No Orders.</Trans>
                            </h4>
                          </div>
                        </div>
                      )}
                      {orderData.length > 0 && (
                        <div className="card bRadius cRadiusTop">
                          <div className="card-body text-center p-0">
                            <hr />
                            <Link to="/orders" className="hrefTitle">
                              <Trans>View all</Trans>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 grid-margin pl-1">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <Trans>Monthly Budget</Trans>
                </h4>
                <p>
                  <Trans>What is the monthly budget for this project?</Trans>
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="pl-0 pr-0">
                          <input
                            type="number"
                            className="form-control bRadius"
                            value={this.state.monthlyBudget}
                            onChange={this.handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pl-1 pr-1">
                          <button
                            className="btn btn-rounded font-weight-medium auth-form-btn"
                            style={{ width: "100%" }}
                            onClick={this.updateMonthlyBudget}
                          >
                            <Trans>Update</Trans>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card bRadius mt-3">
              <div className="card-img-top bRadius p-3 contactCardview">
                <div className="row">
                  <div className="col-sm-8">
                    <h4>
                      <Trans>Need help?</Trans>
                    </h4>
                    <p>
                      <Trans>
                        Lets talk about your seo project - Schedule a free call
                        with our experts!
                      </Trans>
                    </p>
                    <button
                      className="btn btn-rounded p-2"
                      style={{ backgroundColor: "#354252 !important" }}
                      type="button"
                    >
                      <Trans>Make Appointment</Trans>
                    </button>
                    <button
                      onClick={this.handleCallClick}
                      className="btn btn-rounded p-2"
                      type="button"
                      style={{ backgroundColor: "#354252 !important" }}
                    >
                      <Trans>Call</Trans>
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <img
                      className="card-img-top"
                      src={require("../../assets/images/businessman.png")}
                      alt="Card image cap"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectView);
