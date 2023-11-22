import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../assets/custom.css";
export class LinkBundles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <>
        <div className="bundleLinkPage">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">Link bundles</h3>
          </div>
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 blRadius">
                <div className="card-body">
                  <div className="mb-5">
                    <h2 className="fontBold latterSpacing">
                      {" "}
                      Ultimate link building starting at 347 Euro
                    </h2>
                    <img
                      src={require("../../assets/images/packages.png")}
                      className="float-right"
                      style={{ width: "30%" }}
                    ></img>
                    <p className="customText2 mt-4">
                      You lack the time or expertise to search backlinks from
                      our portfolio? Our team will gladly take over this task
                      for you!
                    </p>
                    <p className="customText2">
                      Our link packages not only have impressively high
                      visibility values, the content also achieves maximum topic
                      relevance. We create an individual article for each
                      backlink and publish it with selected publishers.
                    </p>
                    <p className="customText2">
                      After your booking, you can easily personalize your link
                      package by selecting the desired link targets, anchor
                      texts as well as the date of publication. Then our team
                      plans the link building measures according to your
                      specifications. As soon as all backlinks from the booked
                      link package have been completed, you will receive a
                      detailed link report. If you have any questions about our
                      link packages, our support team will be happy to help you.
                      You can reach us by e-mail, live chat or phone at 0228 /
                      286 795 60.
                    </p>
                    <p className="customText2">
                      Note: We reserve the right to refuse any booking. Please
                      note that we generally refuse bookings from the following
                      areas: Eroticism, Cannabis / CBD, Tobacco & Co. or
                      Mechanical Engineering.Note: We reserve the right to
                      refuse any booking. Please note that we generally refuse
                      bookings from the following areas: Eroticism, Cannabis /
                      CBD, Tobacco & Co. or Mechanical Engineering.
                    </p>
                  </div>                  
                </div>
                <div className="pricingCard">
                    <div>
                      <div className="promo-container">
                        <div className="promos bg-base-1">
                          <div className="promo first">
                            <h4 className="exHeading latterSpacing fontBold800">
                              KICKSTART!
                            </h4>
                            <ul className="features">
                              <li className="mt-3 h2">
                                <h2>$357.00</h2>
                              </li>
                              <li>
                                One-time link building, without monthly payment
                              </li>
                              <li>
                                <button className="btn btn-rounded btn-fw btn-md">
                                  Order now
                                </button>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="psale">
                                <span className="notification-icon--fixed">
                                  <span className="notification-badge fontBold500">
                                    2
                                  </span>
                                </span>
                                <span className="psale pl-1">Selllinks</span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                DETAILS
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  Incl. text creation (unique content)
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  Relevant content according to your
                                  specification
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  I100% DoFollow links
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  You choose the anchor text
                                </span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                REPORTING
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  You choose the anchor text
                                </span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                PLACEMENT IN
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <p className="mr-3 planRound fontBold500">
                                    Blog
                                  </p>
                                  <p className="mr-3 planRound fontBold500">
                                    Magazines
                                  </p>
                                  <p className="mr-3 planRound fontBold500">
                                    Newspapers
                                  </p>
                                </div>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                METRICS
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <img
                                    alt="Metrics"
                                    src={require("../../assets/images/project/ahrefs.svg")}
                                    className="rounded mr-2"
                                    width={30}
                                  />
                                  <div style={{lineHeight:"normal"}}>
                                    <span className="ctColor">Domain Rating</span>
                                    <br />
                                    <span>ahrefs.com</span>
                                  </div>
                                  <div className="ml81">
                                    <span>Ø 20+</span>
                                  </div>
                                </div>
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <img
                                    alt="Metrics"
                                    src={require("../../assets/images/project/moz.svg")}
                                    className="rounded mr-2"
                                    width={30}
                                  />
                                  <div style={{lineHeight:"normal"}}>
                                    <span className="ctColor">Domain Authority</span>
                                    <br />
                                    <span>moz.com</span>
                                  </div>
                                  <div className="ml72">
                                    <span>Ø 20+</span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="promo second">
                            <h4 className="exHeading latterSpacing fontBold800">
                              SKYROCKET!
                            </h4>
                            <ul className="features">
                              <li className="mt-3 h2">
                                <h2>$957.00</h2>
                              </li>
                              <li>
                                One-time link building, without monthly payment
                              </li>
                              <li>
                                <button className="btn btn-rounded btn-fw btn-md">
                                  Order now
                                </button>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="psale">
                                <span className="notification-icon--fixed">
                                  <span className="notification-badge fontBold500">
                                    6
                                  </span>
                                </span>
                                <span className="psale pl-1">Selllinks</span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText ctColor">DETAILS</li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  Incl. text creation (unique content)
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  Relevant content according to your
                                  specification
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  I100% DoFollow links
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  You choose the anchor text
                                </span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                REPORTING
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  You choose the anchor text
                                </span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                PLACEMENT IN
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <p className="mr-3 planRound fontBold500">
                                    Blog
                                  </p>
                                  <p className="mr-3 planRound fontBold500">
                                    Magazines
                                  </p>
                                  <p className="mr-3 planRound fontBold500">
                                    Newspapers
                                  </p>
                                </div>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                METRICS
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <img
                                    alt="Metrics"
                                    src={require("../../assets/images/project/ahrefs.svg")}
                                    className="rounded mr-2"
                                    width={30}
                                  />
                                  <div style={{lineHeight:"normal"}}>
                                    <span className="ctColor">Domain Rating</span>
                                    <br />
                                    <span>ahrefs.com</span>
                                  </div>
                                  <div className="ml75">
                                    <span>Ø 20+</span>
                                  </div>
                                </div>
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <img
                                    alt="Metrics"
                                    src={require("../../assets/images/project/moz.svg")}
                                    className="rounded mr-2"
                                    width={30}
                                  />
                                  <div style={{lineHeight:"normal"}}>
                                    <span className="ctColor">Domain Authority</span>
                                    <br />
                                    <span>moz.com</span>
                                  </div>
                                  <div className="ml65">
                                    <span>Ø 20+</span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="promo third scale">
                            <h4 className="exHeading latterSpacing fontBold800">
                              SUPERBOOST!
                              <div className="popularPlan ml-2">
                                <svg
                                  width={17}
                                  id="star"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                POPULAR
                              </div>
                            </h4>
                            <ul className="features">
                              <li className="mt-3 h2">
                                <h2>$657.00</h2>
                              </li>
                              <li>
                                One-time link building, without monthly payment
                              </li>
                              <li>
                                <button className="btn btn-rounded btn-fw btn-md">
                                  Order now
                                </button>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="psale">
                                <span className="notification-icon--fixed">
                                  <span className="notification-badge fontBold500">
                                    4
                                  </span>
                                </span>
                                <span className="psale pl-1">Selllinks</span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText ctColor">DETAILS</li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  Incl. text creation (unique content)
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  Relevant content according to your
                                  specification
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  I100% DoFollow links
                                </span>
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  You choose the anchor text
                                </span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                REPORTING
                              </li>
                              <li className="pl-1">
                                <svg
                                  width={20}
                                  id="check-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color="#ff9756"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1">
                                  You choose the anchor text
                                </span>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                PLACEMENT IN
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <p className="mr-3 planRound fontBold500">
                                    Blog
                                  </p>
                                  <p className="mr-3 planRound fontBold500">
                                    Magazines
                                  </p>
                                  <p className="mr-3 planRound fontBold500">
                                    Newspapers
                                  </p>
                                </div>
                              </li>
                              <li>
                                <hr />
                              </li>
                              <li className="detailsText pl-1 ctColor">
                                METRICS
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <img
                                    alt="Metrics"
                                    src={require("../../assets/images/project/ahrefs.svg")}
                                    className="rounded mr-2"
                                    width={30}
                                  />
                                  <div style={{lineHeight:"normal"}}>
                                    <span className="ctColor">Domain Rating</span>
                                    <br />
                                    <span>ahrefs.com</span>
                                  </div>
                                  <div className="ml105">
                                    <span>Ø 20+</span>
                                  </div>
                                </div>
                              </li>
                              <li className="pl-2">
                                <div className="d-flex">
                                  <img
                                    alt="Metrics"
                                    src={require("../../assets/images/project/moz.svg")}
                                    className="rounded mr-2"
                                    width={30}
                                  />
                                  <div style={{lineHeight:"normal"}}>
                                    <span className="ctColor">Domain Authority</span>
                                    <br />
                                    <span>moz.com</span>
                                  </div>
                                  <div className="ml95">
                                    <span>Ø 20+</span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(LinkBundles);
