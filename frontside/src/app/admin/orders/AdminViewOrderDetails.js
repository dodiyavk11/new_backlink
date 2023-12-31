import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/custom.css";
import Tooltip from "@material-ui/core/Tooltip";
import ApiServices from "../../services/api.service";
import MessageComponents from "../../shared/MessageComponents";

export class AdminViewOrderDetails extends Component {
  constructor(props) {
    const { order_id } = props.match.params;
    super(props);
    this.state = {
      orderData: [],
      domainData: [],
      orderFile: [],
      projectData: [],
      order_id: order_id,
    };
  }

  handleGoBack = () => {
    this.props.history.goBack();
  };  

  loadOrderData = () => {
    ApiServices.SingleOrderView(this.state.order_id,"admin/order/view/")
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({
            orderData: res.data.data,
            domainData: res.data.data.domain,
          });
          if (res.data.data.project) {
            this.setState({
              projectData: res.data.data.project,
            });
          }
          if (res.data.data.orderFile) {
            this.setState({
              orderFile: res.data.data.orderFile,
            });
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

  componentDidMount() {
    this.loadOrderData();
  }
  render() {
    const { orderData, category, domainData, orderFile } = this.state;
    if (orderData.length === 0) {
      return (
        <div className="text-danger">
          <p>Data Not Found.</p>
          <button
            className="btn btn-rounded font-weight-medium auth-form-btn"
            onClick={this.handleGoBack}
          >
            Back
          </button>
        </div>
      );
    }
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
    return (
      <div>
        <ToastContainer />
        <style>{`
          .confirmation-toast {
            background-color: #ff9756;
            color: #ffffff;
            width:400px;
          }

          .confirmation-toast button {
            margin: 0 5px;
            cursor: pointer;
          }
        `}</style>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-img-top d-flex flex-row justify-content-between p-4">
                <button
                  className="btn btn-rounded font-weight-medium auth-form-btn"
                  onClick={this.handleGoBack}
                >
                  <i className="mdi mdi-arrow-left"></i> <Trans>Back</Trans>
                </button>                
              </div>
              <div className="card-body dashboardCard">
                <div className="card-img-top d-flex flex-row justify-content-between">
                  <div>
                    <h2 className="h2">{orderData.isBundle !==0 ? "Link Bundle" : domainData.domain_name}</h2>
                    <h5>Placed at: {orderData.created_at}</h5>
                  </div>
                  <div>
                    <h4 className="h4">
                      Status:{" "}
                      <span
                        className={`fontSize13 badge ${getStatusClass(
                          orderData.status
                        )}`}
                      >
                        <Trans>{orderData.status}</Trans>
                      </span>
                    </h4>
                    <h5>
                    <Trans>Amount</Trans>: <b>${orderData.total_price}</b>
                    </h5>
                  </div>
                </div>
                <hr />
              </div>
              <div className="card">
                <div className="card-body pt-2">
                  <h4 className="card-title"><Trans>Orders details</Trans></h4>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                          <Trans>Anchor text</Trans>
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
                          <td className="text-end-ct">
                            {orderData.anchortext}
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <Trans>Delivery time</Trans>
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
                          <td className="text-end-ct">
                          {orderData.isBundle !==0 ? "" : `${domainData.deliveryTime} Days`}
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <Trans>Link</Trans>
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
                          <td className="text-end-ct">
                          {orderData.isBundle !==0 ? "" : domainData.attribute}
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <Trans>Language</Trans>
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
                          <td className="text-end-ct">
                            {/* {domainData.language === "en"
                              ? "English"
                              : "German"} */}
                              {orderData.isBundle !==0 ? "" : domainData.language}
                          </td>
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
                          <td className="text-end-ct">
                            {/* {domainData.tld ? "." + domainData.tld : ""} */}
                            {orderData.isBundle !==0 ? "" : `.${domainData.tld}`}
                          </td>
                        </tr>
                        {orderData.textCreation === "Own" && (
                          <tr>
                            <td><Trans>Text file</Trans></td>
                            <td className="text-end-ct">
                              <span className="sampleFile ml-4">
                                <a
                                  href={`${ApiServices.APP_URL.replace(
                                    /\/$/,
                                    ""
                                  )}/assets/order_assets/${
                                    orderFile.file_name
                                  }`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hrefTitle"
                                >
                                  <b className="text-warning">
                                  <Trans>Download text file</Trans>
                                  </b>
                                </a>
                              </span>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td><Trans>Target Url</Trans></td>
                          <td className="text-end-ct">
                            <a
                              href={orderData.linktarget}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Trans>Go to</Trans>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><Trans>Note</Trans></td>
                          <td className="text-end-ct">{orderData.note}</td>
                        </tr>
                        <tr>
                          <td><Trans>Word count</Trans></td>
                          <td className="text-end-ct">{orderData.wordCount}</td>
                        </tr>
                        <tr>
                          <td><Trans>Approve text before publication</Trans></td>
                          <td className="text-end-ct">
                            {orderData.approveText === 1 ? "Yes" : "No"}
                          </td>
                        </tr>
                        <tr>
                          <td><Trans>Anchor text chosen by Backlinked</Trans></td>
                          <td className="text-end-ct">
                            {orderData.chooseByBacklink === 1 ? "Yes" : "No"}
                          </td>
                        </tr>
                        <tr>
                          <td><Trans>Text approval price</Trans></td>
                          <td className="text-end-ct">
                            {orderData.approveText === 1
                              ? "$" + orderData.approveTextPrice
                              : "N/A"}
                          </td>
                        </tr>
                        {orderData.textCreation === "Editorial" && (
                          <tr>
                            <td><Trans>Text creation price</Trans></td>
                            <td className="text-end-ct">
                              {orderData.textCreationPrice > 0
                                ? "$" + orderData.textCreationPrice
                                : "Free"}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td><Trans>Price</Trans></td>
                          <td className="text-end-ct">${orderData.price}</td>
                        </tr>
                        <tr>
                          <td className="h4 fontBold600"><Trans>Total Price</Trans></td>
                          <td className="text-end-ct">
                            <span className="h3 fontBold600">
                              ${orderData.total_price}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <MessageComponents order_id={this.state.order_id} isShowTypeMsg={false}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminViewOrderDetails);
