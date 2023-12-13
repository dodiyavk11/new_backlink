import React, { Component } from "react";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/custom.css";

export class DailyDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyData: [],
    };
  }
  handleOpenContentDomain = (url) => {
    window.open("https://" + url, "_blank");
  };
  fetchContentLinkData(filter = null) {
    ApiServices.getContentLinkList(filter).then(
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

  componentDidMount() {
    this.fetchContentLinkData();
  }
  render() {
    const { dailyData } = this.state;
    return (
      <>
        <div className="row dailTableC">
          <ToastContainer />
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-hover top5Deals">
                <thead>
                  <tr className="align-middle">
                    <th>Name</th>
                    <th>Rating</th>
                    <th>DR</th>
                    <th>DA</th>
                    <th>TF</th>
                    <th>Price</th>
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
                          onClick={() => this.handleOpenContentDomain(item.domain_name)}
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
                          <p>
                            {item.category.name}
                          </p>
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
                          <p className="fontBold700">${item.price}</p>
                          <p>
                            <del>$0.00</del>
                          </p>
                        </div>
                      </td>
                      <td className="h3">
                        <svg
                          onClick={() => this.props.handleAddtoCart(item.hash_id)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-bag"
                          viewBox="0 0 16 16"
                          style={{ color: "#757575c9",cursor: "pointer" }}
                        >
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                  {/* <tr className="">
                    <td style={{ display: "flex" }}>
                      <button
                        className="customBtn2 mr-2"
                        tabIndex="0"
                        type="button"
                        aria-label="link"
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
                        <p className="fontBold700">xyz.com</p>
                        <p>
                          Electronics &amp; Computers, Internet &amp; SEO,
                          Telecommunications
                        </p>
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
                      5.00
                    </td>
                    <td>70</td>
                    <td>43</td>
                    <td>45</td>
                    <td style={{ display: "flex" }}>
                      <div>
                        <p className="fontBold700">$387.60</p>
                        <p>
                          <del>$456.60</del>
                        </p>
                      </div>
                    </td>
                    <td className="h3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-bag"
                        viewBox="0 0 16 16"
                        style={{color:"#757575c9"}}
                      >
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </td>
                  </tr>                   */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
