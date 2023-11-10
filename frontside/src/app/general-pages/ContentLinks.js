import React, { Component } from "react";
// import { withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
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
    };
  }
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
                <h2 className="h2">Domain : {contentData.domain_name}</h2>
                <div className="flex flex-wrap mt-4 gap-2">
                  <div className="px-3 py-2 catContent items-center justify-center">
                    {category.name}
                  </div>
                </div>
                <hr />
                <div className="row g-2">
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="p-3 border">
                      <b>Visibility index</b>
                      <div className="dataInside mt-3">
                        <span className="h3">
                          {contentInsideData.visibility_index}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="p-3 border">
                      <b>Domain Rating</b>
                      <div className="dataInside mt-3">
                        <span className="h3">
                          {contentInsideData.domain_rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="p-3 border">
                      <b>Referring Domains</b>
                      <div className="dataInside mt-3">
                        <span className="h3">
                          {contentInsideData.referring}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-2 mt-2">
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="p-3 border">
                      <b>Citation Flow</b>
                      <div className="dataInside mt-3">
                        <span className="h3">
                          {contentInsideData.citation_flow}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="p-3 border">
                      <b>Trust Flow</b>
                      <div className="dataInside mt-3">
                        <span className="h3">
                          {contentInsideData.trust_flow}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4" style={{ paddingRight: "0px" }}>
                    <div className="p-3 border">
                      <b>Domain Authority</b>
                      <div className="dataInside mt-3">
                        <span className="h3">
                          {contentInsideData.authority}
                        </span>
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
                        <td><span className="h2">0</span></td>
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
