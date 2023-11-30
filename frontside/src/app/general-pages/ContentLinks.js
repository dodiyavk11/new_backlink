import React, { Component } from "react";
// import { withRouter, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
import Tooltip from "@material-ui/core/Tooltip";
import ApiServices from "../services/api.service";
import PlaceOrderDetailsModal from "../shared/PlaceOrderDetailsModal";
export class ContentLinks extends Component {
  constructor(props) {
    const { hash_id } = props.match.params;
    super(props);
    this.state = {
      contentData: [],
      contentInsideData: [],
      category: [],
      hash_id: hash_id,
      showModalStep1: false,
      showModalStep2: false,
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
  showProjectModal = () => this.setState({ showModalStep1: true });

  handleNextStep = () => {
    this.setState({
      showModalStep1: false,
      showModalStep2: true,
    });
  };
  
  handleBackStep = () => {
    this.setState({
      showModalStep1: true,
      showModalStep2: false,
    });
  };

  handleClose = () => {
    this.setState({
      showModalStep1: false,
      showModalStep2: false,
    });
  };

  handleFormSubmit = (formData) => {
    this.closeConfigureModal();
  };

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
  handleGoBack = () => {
    this.props.history.goBack();
  };
  componentDidMount() {
    AuthService.getContentLinksData(this.state.hash_id)
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({ contentData: res.data.data });
          if (res.data.data.category) {
            this.setState({ category: res.data.data.category });
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
  }
  handleAddtoCart = (hash_id) => {
    ApiServices.addToCartContentLink(hash_id).then(
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
    const contentData = this.state.contentData;
    const category = this.state.category;
    const contentInsideData = this.state.contentInsideData;
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
                  <i className="mdi mdi-arrow-left"></i> Back
                </button>
                <a
                  className="btn btn-rounded font-weight-medium auth-form-btn"
                  href={`http://${contentData.domain_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="mdi mdi-arrow-top-right"></i> Visit domain
                </a>
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
                          <b>Visibility index</b>
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
                          <b>Domain Rating</b>
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
                          <b>Referring Domains</b>
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
                          <b>Citation Flow</b>
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
                          <b>Trust Flow</b>
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
                          <b>Domain Authority</b>
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
              </div>
            </div>
          </div>
          <div className="col-lg-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          Traffic{" "}
                          <Tooltip
                            title="Traffic describes the monthly users of a website. (organic only)"
                            placement="right"
                            arrow
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-question-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                          </Tooltip>
                        </td>
                        <td className="text-end-ct">
                          <span className="fontBold500">
                            {contentInsideData.traffic}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Anchor text
                          <Tooltip
                            title="Anchor text refers to the clickable text of a link."
                            placement="right"
                            arrow
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-question-circle ml-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                          </Tooltip>
                        </td>
                        <td className="text-end-ct">0</td>
                      </tr>
                      <tr>
                        <td>
                          Delivery time
                          <Tooltip
                            title="Turnaround time is based on real data and is expressed in business days."
                            placement="right"
                            arrow
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-question-circle ml-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                          </Tooltip>
                        </td>
                        <td className="text-end-ct">0</td>
                      </tr>
                      <tr>
                        <td>
                          Link
                          <Tooltip
                            title="Dofollow links are particularly high on Google, while nofollow links don't have much impact on your ranking. It is estimated by an independent thrid party."
                            placement="right"
                            arrow
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-question-circle ml-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                          </Tooltip>
                        </td>
                        <td className="text-end-ct">0</td>
                      </tr>
                      <tr>
                        <td>
                          Language
                          <Tooltip
                            title="Language in which your article will be written by us."
                            placement="right"
                            arrow
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-question-circle ml-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                          </Tooltip>
                        </td>
                        <td className="text-end-ct">0</td>
                      </tr>
                      <tr>
                        <td>
                          TLD
                          <Tooltip
                            title="Domain extension of the selected website."
                            placement="right"
                            arrow
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-question-circle ml-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                            </svg>
                          </Tooltip>
                        </td>
                        <td className="text-end-ct">0</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td className="text-end-ct">
                          <span className="h3 fontBold600">
                            ${contentData.price}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-center">
                          <div className="btn-group-md mb-2">
                            <button
                              className="btn btn-rounded font-weight-medium auth-form-btn"
                              style={{ width: "100%" }}
                              onClick={this.showProjectModal}
                            >
                              Order now
                            </button>
                          </div>
                          <div className="btn-group-md">
                            <button
                              className="btn btn-primary btn btn-rounded custamFilterBtn"
                              onClick={() =>
                                this.handleAddtoCart(contentData.hash_id)
                              }
                              style={{ width: "100%" }}
                            >
                              Add to cart
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PlaceOrderDetailsModal
          showModal={this.state.showModalStep1}
          showModal2={this.state.showModalStep2}
          handleClose={this.handleClose}
          handleNextStep={this.handleNextStep}
          handleBackStep={this.handleBackStep}
          contetnPrice={contentData.price}
          contentLinkId={this.state.hash_id}
        />
      </div>
    );
  }
}

export default ContentLinks;
