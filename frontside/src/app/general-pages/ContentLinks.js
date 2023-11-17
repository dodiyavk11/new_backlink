import React, { Component } from "react";
// import { withRouter, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";

export class ContentLinks extends Component {
  constructor(props) {
    const { hash_id } = props.match.params;
    super(props);
    this.state = {
      contentData: [],
      contentInsideData: [],
      category: [],
      hash_id: hash_id,
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
  handleHover = (event, chartElements,type) => {
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
                          <img alt="Metrics"
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
                              this.handleHover(event, chartElements,"vIndex"),
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
                          <img alt="ahrefs"
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
                              this.handleHover(event, chartElements,"dRating"),
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
                          <img alt="ahrefs"
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
                              this.handleHover(event, chartElements,"rDomain"),
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
                          <img alt="majestic"
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
                              this.handleHover(event, chartElements,"cFlow"),
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
                          <img alt="majestic"
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
                              this.handleHover(event, chartElements,"tFlow"),
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
                          <img alt="moz"
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
                              this.handleHover(event, chartElements,"dAuthority"),
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
                        <td>Traffic</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Anchor text</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Delivery time</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Link</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Language</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>TLD</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>
                          <span className="h2">0</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLinks;
