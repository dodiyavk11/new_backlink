import React, { Component } from "react";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";
import "../../assets/custom.css";
import RevealDomainModal from "../shared/RevealDomainModal";
import CurrencyFormatter from "../shared/CurrencyFormatter";

export class DailyDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyData: [],
      showModal: false,
      domain_id: null,
      publisher_id: null,
    };
  }

  showModal = () => this.setState({ showModal: true });
  closeModal = () => this.setState({ showModal: false });

  handleOpenContentDomain = (url) => {
    window.open("https://" + url, "_blank");
  };

  handleRequestClick = (domain_id, publisher_id) => {
    this.setState({
      domain_id: domain_id,
      publisher_id: publisher_id,
      showModal: true,
    });
  };

  fetchContentLinkData(filter = null) {
    ApiServices.getDailyDealsContentLink(filter).then(
      (res) => {
        if (res.data.status) {
          this.setState({
            dailyData: res.data.data.contentData,
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
  }

  handleFormSubmit = (formData) => {
    formData.domain_id = this.state.domain_id;
    formData.publisher_id = this.state.publisher_id;
    ApiServices.addDomainRevealRequest(formData).then(
      () => {
        toast.success(<Trans>Your request send success</Trans>, {
          position: "top-center",
          autoClose: 2000,
        });
        this.closeModal();
        this.fetchContentLinkData();
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

  componentDidMount() {
    this.fetchContentLinkData();
  }
  render() {
    const { dailyData, domain_id } = this.state;
    return (
      <>
        <div className="row dailTableC">
          <ToastContainer />
          <RevealDomainModal
            showModal={this.state.showModal}
            handleClose={this.closeModal}
            onSubmit={this.handleFormSubmit}
          />
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-hover top5Deals">
                <thead>
                  <tr className="align-middle">
                    <th>
                      <Trans>Name</Trans>
                    </th>
                    <th>
                      <Trans>Rating</Trans>
                    </th>
                    <th>
                      <Trans>DR</Trans>
                    </th>
                    <th>
                      <Trans>DA</Trans>
                    </th>
                    <th>
                      <Trans>TF</Trans>
                    </th>
                    <th>
                      <Trans>Price</Trans>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.map((item, index) => (
                    <tr key={index}>
                      <td style={{ display: "flex" }}>
                        <button
                          className="customBtn2 mr-2"
                          tabIndex="0"
                          type="button"
                          aria-label="link"
                          onClick={() =>
                            this.handleOpenContentDomain(item.domain_name)
                          }
                        >
                          <svg
                            width={24}
                            id="external-link"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                        <div>
                          <p className="fontBold700">{item.domain_name}</p>
                          <p>{item.category.name}</p>
                        </div>
                      </td>
                      <td>
                        <svg
                          className="mr-1"
                          width={15}
                          id="star"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#fbc02d"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          style={{ color: "#fbc02d" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        {item.contentData.rating}
                      </td>
                      <td>{item.contentData.domain_rating}</td>
                      <td>{item.contentData.authority}</td>
                      <td>{item.contentData.trust_flow}</td>
                      <td style={{ display: "flex" }}>
                        <div>
                          <p className="fontBold700">
                            {CurrencyFormatter.formatCurrency(item.price)}
                          </p>
                          <p>
                            <del>{CurrencyFormatter.formatCurrency(0.0)}</del>
                          </p>
                        </div>
                      </td>
                      <td className="h3">
                        {item.domainRequest.length > 0 &&
                        item.domainRequest[0].status === 0 ? (
                          <i
                            className="mdi mdi-timer-sand"
                            style={{ fontSize: "30px", cursor: "pointer" }}
                            title="Request Pending"
                          ></i>
                        ) : item.domainRequest.length > 0 &&
                        item.domainRequest[0].status === 2 ? (
                        <i
                          className="mdi mdi-close-circle"
                          title="Your request declined."
                          style={{ fontSize: "25px", cursor: "pointer", color: "red" }}
                        ></i>
                      ) : item.domainRequest.length === 0 ? (
                          <i
                            onClick={() =>
                              this.handleRequestClick(item.id, item.user_id)
                            }
                            className="mdi mdi-comment-question-outline"
                            style={{ fontSize: "30px", cursor: "pointer" }}
                            title="Send Request"
                          ></i>
                        ) : (
                          <svg
                            onClick={() =>
                              this.props.handleAddtoCart(item.hash_id)
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-bag"
                            viewBox="0 0 16 16"
                            style={{ color: "#757575c9", cursor: "pointer" }}
                          >
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
