import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import ApiServices from "../services/api.service";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: this.props.isAuthenticated,
      cartData: [],
    };
    this.handleLogouts = this.handleLogouts.bind(this);
  }
  getCartData = () => {
    ApiServices.getUserCartData().then(
      (res) => {
        if (res.data.status) {
          this.setState({
            cartData: res.data.data,
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
        alert(resMessage);
      }
    );
  };
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.getCartData();
    if (userData) {
      this.setState({ user: userData });
    }
  }
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  handleLogouts = (e) => {
    e.preventDefault();
    this.props.handleLogout();
    console.log(this.props.isAuthenticated);
  };
  render() {
    const { cartData } = this.state;
    const imageUrl = `${process.env.REACT_APP_BASE_URL}assets/profile/${this.state.user.profile}`;

    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex justify-content-center">
          <Link
            className="navbar-brand brand-logo d-flex justify-content-center"
            to="/"
          >
            <div>
              <img
                src={require("../../assets/images/logo_new.png")}
                alt="logo"
              />
            </div>
            <div className="text-light align-items-center justify-content-center ml-2">
              <span className="h6 extraLogoText">Fairlinked</span>
            </div>
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src={require("../../assets/images/logo_new.png")} alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item">
              {/* <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="mdi mdi-cart-outline"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <h6 className="p-3 mb-0">
                    <Trans>Cart</Trans>
                  </h6>
                  <div className="dropdown-divider"></div>
                  {cartData.map((order) => (
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <h4>{order.cartItems.domain_name}</h4>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                          <Trans>{order.cartItems.price}</Trans>
                        </h6>                        
                      </div>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face4.jpg")}
                        alt="user"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                        <Trans>Mark send you a message</Trans>
                      </h6>
                      <p className="text-gray mb-0">
                        1 <Trans>Minutes ago</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face2.jpg")}
                        alt="user"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                        <Trans>Cregh send you a message</Trans>
                      </h6>
                      <p className="text-gray mb-0">
                        15 <Trans>Minutes ago</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face3.jpg")}
                        alt="user"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                        <Trans>Profile picture updated</Trans>
                      </h6>
                      <p className="text-gray mb-0">
                        18 <Trans>Minutes ago</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">
                    4 <Trans>new messages</Trans>
                  </h6>
                </Dropdown.Menu>
              </Dropdown> */}
            </li>
            <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <svg
                    width={24}
                    id="bell"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: "#707070" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0">
                    <Trans>Notifications</Trans>
                  </h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="mdi mdi-calendar"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1">
                        <Trans>Event today</Trans>
                      </h6>
                      <p className="text-gray ellipsis mb-0">
                        <Trans>
                          Just a reminder that you have an event today
                        </Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="mdi mdi-settings"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1">
                        <Trans>Settings</Trans>
                      </h6>
                      <p className="text-gray ellipsis mb-0">
                        <Trans>Update dashboard</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-link-variant"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1">
                        <Trans>Launch Admin</Trans>
                      </h6>
                      <p className="text-gray ellipsis mb-0">
                        <Trans>New admin wow</Trans>!
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">
                    <Trans>See all notifications</Trans>
                  </h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">
                      {this.state.user ? (
                        <Trans>
                          <b className="fontBold500">
                            {this.state.user.firstName}{" "}
                            {this.state.user.lastName}
                          </b>
                          <br />
                          <span>
                            {this.state.user.isAdmin === 1
                              ? "Admin"
                              : this.state.user.isAdmin === 2
                              ? "Publisher"
                              : "User"}
                          </span>
                        </Trans>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="nav-profile-img">
                    {this.state.user.profile ? (
                      <img src={imageUrl} alt="user" />
                    ) : (
                      <img
                        src={require("../../assets/images/faces/face1.jpg")}
                        alt="user"
                      />
                    )}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown">
                  {/* <Dropdown.Item> */}

                  <Link to="/account/payments" className="dropdown-item">
                    <i className="mdi mdi-wallet mr-2 text-primary"></i>
                    <Trans>Payments</Trans>
                  </Link>
                  {/* </Dropdown.Item> */}
                  {/* <Dropdown.Item onClick={(evt) => evt.preventDefault()}> */}
                  <Link to="/settings/profile" className="dropdown-item">
                    <i className="mdi mdi-account-circle mr-2 text-primary"></i>
                    <Trans>Profile</Trans>
                  </Link>
                  {/* </Dropdown.Item> */}
                  {/* <Dropdown.Item onClick={(evt) => evt.preventDefault()}> */}
                  {/* <i className="mdi mdi-account-check mr-2 text-primary"></i> */}
                  <Link to="/settings/account" className="dropdown-item">
                    <i className="mdi mdi-account-check mr-2 text-primary"></i>
                    <Trans>Account</Trans>
                  </Link>
                  {/* </Dropdown.Item> */}
                  {/* <Dropdown.Item onClick={(evt) => evt.preventDefault()}> */}
                  {/* <i className="mdi mdi-bell-ring mr-2 text-primary"></i> */}
                  <Link to="/settings/notifications" className="dropdown-item">
                    <i className="mdi mdi-bell-ring mr-2 text-primary"></i>
                    <Trans>Notification</Trans>
                  </Link>
                  {/* </Dropdown.Item> */}
                  <Dropdown.Item onClick={this.handleLogouts}>
                    <i className="mdi mdi-logout mr-2 text-primary"></i>
                    <Trans>Log out</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
