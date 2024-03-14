import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import { withTranslation } from "react-i18next";
import ApiServices from "../services/api.service";
import CurrencyFormatter from "./CurrencyFormatter";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: this.props.isAuthenticated,
      lng: "en",
    };
    this.handleLogouts = this.handleLogouts.bind(this);
  }
  changeLanguage = (lng) => {
    const { i18n } = this.props;
    this.props.i18n.changeLanguage(lng);
    this.setState({ lng: lng });
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
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
  };
  render() {
    const imageUrl = `${process.env.REACT_APP_BASE_URL}assets/profile/${this.state.user.profile}`;
    const isAdmin = localStorage.getItem("isAdmin");
    const linkHome =
      this.state.user.isAdmin === 1
        ? "/admin/contentlinks"
        : this.state.user.isAdmin === 2
        ? "/publisher/domain"
        : "/dashboard";
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex justify-content-center">
          <Link
            className="navbar-brand brand-logo d-flex justify-content-center"
            to={linkHome}
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
              <img
                onClick={() => this.changeLanguage("de")}
                src={require("../../assets/images/de.svg")}
                alt="DE"
                title="German"
                width={20}
                className={`mr-3 cursorClass ${
                  this.state.lng === "de" ? "optacity05" : ""
                }`}
              />
            </li>
            <li className="nav-item">
              <img
                onClick={() => this.changeLanguage("en")}
                src={require("../../assets/images/US.svg")}
                alt="DE"
                width={20}
                title="English"
                className={`mr-3 cursorClass ${
                  this.state.lng === "en" ? "optacity05" : ""
                }`}
              />
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
                  {isAdmin === "0" && (
                    <Link to="/account/payments" className="dropdown-item">
                      <i className="mdi mdi-wallet mr-2 text-primary"></i>
                      <Trans>Payments</Trans>
                    </Link>
                  )}
                  {isAdmin === "1" && (
                    <Link to="/admin/payments" className="dropdown-item">
                      <i className="mdi mdi-wallet mr-2 text-primary"></i>
                      <Trans>Payments</Trans>
                    </Link>
                  )}
                  {isAdmin === "2" && (
                    <Link to="/publisher/payments" className="dropdown-item">
                      <i className="mdi mdi-wallet mr-2 text-primary"></i>
                      <Trans>Payments</Trans>
                    </Link>
                  )}
                  <Link to="/settings/profile" className="dropdown-item">
                    <i className="mdi mdi-account-circle mr-2 text-primary"></i>
                    <Trans>Profile</Trans>
                  </Link>
                  <Link to="/settings/account" className="dropdown-item">
                    <i className="mdi mdi-account-check mr-2 text-primary"></i>
                    <Trans>Account</Trans>
                  </Link>
                  {isAdmin === "0" && (
                    <Link
                      to="/settings/notifications"
                      className="dropdown-item"
                    >
                      <i className="mdi mdi-bell-ring mr-2 text-primary"></i>
                      <Trans>Notification</Trans>
                    </Link>
                  )}
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

// export default withRouter(Navbar);
export default withTranslation()(withRouter(Navbar));
