import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: this.props.isAuthenticated,
    };
  }
  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    const props = this.props;
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          {props.isAdmin === "0" ? (
            <>
              <li
                className={
                  this.isPathActive("/dashboard")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/dashboard">
                  <svg
                    width="24"
                    className="mr-3"
                    id="chart-pie"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Dashboard</Trans>
                  </span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/projects")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/projects">
                  <svg
                    width="24"
                    className="mr-3"
                    id="clipboard-check"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Projects</Trans>
                  </span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/tables") ? "nav-item active" : "nav-item"
                }
              >
                <div
                  className={
                    this.state.tablesMenuOpen
                      ? "nav-link menu-expanded"
                      : "nav-link"
                  }
                  onClick={() => this.toggleMenuState("tablesMenuOpen")}
                  data-toggle="collapse"
                >
                  <span className="menu-title">
                    <svg
                      width={24}
                      className="mr-3"
                      id="link"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <Trans>MarketPlace</Trans>
                  </span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={this.state.tablesMenuOpen}>
                  <ul className="nav flex-column sub-menu">
                    <li
                      className={
                        this.isPathActive("/marketplace/contentlinks")
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/marketplace/contentlinks")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/marketplace/contentlinks"
                      >
                        <Trans>Backlinks</Trans>
                      </Link>
                    </li>
                    <li
                      className={
                        this.isPathActive("/marketplace/linkbundle")
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/marketplace/linkbundle")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/marketplace/linkbundle"
                      >
                        <Trans>Link Bundles</Trans>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
            </>
          ) : null}

          {props.isAdmin === "2" ? (
            <>
              <li
                className={
                  this.isPathActive("/publisher/domain")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/publisher/domain">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    viewBox="0 0 24 24"
                    className="mr-3"
                  >
                    <path
                      d="M20.12,17.75s0,.01-.01,0a1.415,1.415,0,0,1-1.01.42h-.16l-.09-.02a1.507,1.507,0,0,1-1.18-1.01l-.07-.21c-.25-.07-.5-.13-.76-.18a10.932,10.932,0,0,0,.33-1.1l-.106-.32h.006l-.45-1.35a.254.254,0,0,1-.12.02.433.433,0,0,1-.19-.04.533.533,0,0,1-.27-.27.471.471,0,0,1,0-.38.533.533,0,0,1,.27-.27l-.42-1.25a1.531,1.531,0,0,1,.36-1.54c.027-.027.06-.048.089-.073v0a1.5,1.5,0,0,1,.43-.265l.02-.006a1.445,1.445,0,0,1,.442-.091c.026,0,.052-.008.078-.008a1.558,1.558,0,0,1,.48.08l5.32,1.77v-.99a1,1,0,0,0-1-1h-.552a9.385,9.385,0,0,0-1.634-3.077l-.009-.011a9.466,9.466,0,0,0-14.831,0l0,.006A9.356,9.356,0,0,0,3.442,9.67H2.89a1,1,0,0,0-1,1v3.66a1,1,0,0,0,1,1h.552A9.306,9.306,0,0,0,5.06,18.38a9.463,9.463,0,0,0,14.65.29h.01a7.381,7.381,0,0,0,.58-.77l.06-.09a1,1,0,0,1-.15-.14A.647.647,0,0,1,20.12,17.75Zm-3.908-2.42a9.848,9.848,0,0,1-.392,1.24A20.108,20.108,0,0,0,13,16.32v-.99ZM12.85,13.85a.478.478,0,0,1-.54.11A.5.5,0,0,1,12,13.5v-2a.5.5,0,0,1,1,0v.79l.15-.14a.483.483,0,0,1,.7,0l.15.14V11.5a.5.5,0,0,1,1,0v2a.5.5,0,0,1-.31.46.433.433,0,0,1-.19.04.469.469,0,0,1-.35-.15l-.65-.64ZM13,4.474a9.594,9.594,0,0,1,2.391,2.982A20.812,20.812,0,0,1,13,7.649Zm-1,0V7.649a21,21,0,0,1-2.39-.192A9.59,9.59,0,0,1,12,4.473Zm0,4.2v1H8.781a10.367,10.367,0,0,1,.394-1.247A21.665,21.665,0,0,0,12,8.671ZM8.31,13.96A.5.5,0,0,1,8,13.5v-2a.5.5,0,0,1,1,0v.79l.15-.14a.483.483,0,0,1,.7,0l.15.14V11.5a.5.5,0,0,1,1,0v2a.5.5,0,0,1-.31.46.433.433,0,0,1-.19.04.469.469,0,0,1-.35-.15l-.65-.64-.65.64A.474.474,0,0,1,8.31,13.96ZM12,15.33v.99a20.251,20.251,0,0,0-2.83.25,10.435,10.435,0,0,1-.389-1.24Zm0,1.99v3.211a9.541,9.541,0,0,1-2.4-3.012A19.071,19.071,0,0,1,12,17.32Zm1,3.207V17.32a17.265,17.265,0,0,1,2.4.2A9.5,9.5,0,0,1,13,20.527ZM13,9.67v-1a21.665,21.665,0,0,0,2.825-.248,10.311,10.311,0,0,1,.394,1.247Zm4.235,0a11.533,11.533,0,0,0-.413-1.431,18.5,18.5,0,0,0,2.553-.719A8.381,8.381,0,0,1,20.5,9.67Zm1.454-2.977a17.33,17.33,0,0,1-2.263.6,10.455,10.455,0,0,0-2.244-3.115A8.563,8.563,0,0,1,18.689,6.693ZM10.817,4.177A10.548,10.548,0,0,0,8.57,7.291a17.269,17.269,0,0,1-2.259-.6A8.557,8.557,0,0,1,10.817,4.177ZM5.625,7.52a18.315,18.315,0,0,0,2.543.716A11.58,11.58,0,0,0,7.753,9.67H4.5A8.381,8.381,0,0,1,5.625,7.52ZM4.31,13.96A.5.5,0,0,1,4,13.5v-2a.5.5,0,0,1,1,0v.79l.15-.14a.483.483,0,0,1,.7,0l.15.14V11.5a.5.5,0,0,1,1,0v2a.5.5,0,0,1-.31.46A.433.433,0,0,1,6.5,14a.469.469,0,0,1-.35-.15l-.65-.64-.65.64A.474.474,0,0,1,4.31,13.96Zm3.443,1.37a11.813,11.813,0,0,0,.409,1.42h0a17.292,17.292,0,0,0-2.54.72,8.3,8.3,0,0,1-1.1-2.14ZM6.29,18.29a16.425,16.425,0,0,1,2.27-.6h0a10.526,10.526,0,0,0,2.254,3.131h0A8.519,8.519,0,0,1,6.29,18.29Zm7.89,2.54a10.382,10.382,0,0,0,2.26-3.14,15.471,15.471,0,0,1,2.27.61A8.346,8.346,0,0,1,14.18,20.83Zm8.99-5.54a.472.472,0,0,1-.15.39l-1.34,1.34a.472.472,0,0,1-.39.15.505.505,0,0,1-.37-.21l-.02-.03-.43-.6-.26-.36-.25.36-.45.63a.521.521,0,0,1-.41.21.22.22,0,0,1-.08-.01.486.486,0,0,1-.4-.33l-.17-.5-.33-1-1.28-3.86a.5.5,0,0,1,.63-.63l5.36,1.78a.509.509,0,0,1,.28.24.428.428,0,0,1,.05.16.468.468,0,0,1-.05.31.413.413,0,0,1-.15.17l-.99.71.99.71a.572.572,0,0,1,.15.16A.727.727,0,0,1,23.17,15.29Z"
                      data-name="Website Domain"
                      fill="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Domain</Trans>
                  </span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/publisher/request-domain")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/publisher/request-domain">
                  <svg
                    fill="#9e9e9f"
                    style={{ marginRight: "22px" }}
                    height="22px"
                    width="22px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-61.2 -61.2 734.40 734.40"
                    xmlSpace="preserve"
                    stroke="#9e9e9f"
                    strokeWidth="0.0061199900000000005"
                    transform="rotate(0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="1.2239980000000001"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <g>
                            <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"></path>
                            <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258C323.259,126.96,315.532,119.235,306.001,119.235z"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span className="menu-title">
                    <Trans>Notification</Trans>
                  </span>
                </Link>
              </li>
            </>
          ) : null}

          {props.isAdmin === "1" ? (
            <>              
              <li
                className={
                  this.isPathActive("/admin/contentlinks")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/contentlinks">
                  <svg
                    width={24}
                    className="mr-3"
                    id="newspaper"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Backlinks</Trans>
                  </span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/admin/projects")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/projects">
                  <svg
                    width="24"
                    className="mr-3"
                    id="clipboard-check"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Projects</Trans>
                  </span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/admin/users")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/users">
                  <svg
                    width={24}
                    className="mr-3"
                    id="users"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Users</Trans>
                  </span>
                </Link>
              </li>
              {/* <li
                className={
                  this.isPathActive("/admin/plan")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/plan">
                  <svg
                    id="local_play"
                    fill="#a2adb1"
                    viewBox="0 0 24 24"
                    width={24}
                    className="mr-3"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM9.07 16L12 14.12 14.93 16l-.89-3.36 2.69-2.2-3.47-.21L12 7l-1.27 3.22-3.47.21 2.69 2.2z" />
                  </svg>
                  <span className="menu-title">
                    <Trans>Plan</Trans>
                  </span>
                </Link>
              </li> */}
              <li
                className={
                  this.isPathActive("/admin/subscription")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/subscription">
                  <svg
                    id="local_play"
                    fill="#a2adb1"
                    viewBox="0 0 24 24"
                    width={24}
                    className="mr-3"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM9.07 16L12 14.12 14.93 16l-.89-3.36 2.69-2.2-3.47-.21L12 7l-1.27 3.22-3.47.21 2.69 2.2z" />
                  </svg>
                  <span className="menu-title">
                    <Trans>Subscription Plan</Trans>
                  </span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/admin/emailTemplate")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/emailTemplate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="#a2adb1"
                    width={24}
                    className="mr-3"
                  >
                    <g data-name="20-Email-Write">
                      <path d="M29 3H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h13v-2H3a1 1 0 0 1-1-1V6.23l13.42 9.58a1 1 0 0 0 1.16 0L30 6.23V15h2V6a3 3 0 0 0-3-3zM16 13.77 3.72 5h24.56z" />
                      <path d="M26 15h-4a1 1 0 0 0-1 1v10a1 1 0 0 0 .29.71l2 2a1 1 0 0 0 1.41 0l2-2A1 1 0 0 0 27 26V16a1 1 0 0 0-1-1zm-1 10.59-1 1-1-1V21h2z" />
                    </g>
                  </svg>
                  <span className="menu-title">
                    <Trans>Email template</Trans>
                  </span>
                </Link>
              </li>

              <li
                className={
                  this.isPathActive("/admin/domainCategory")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/domainCategory">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-list mr-3"
                    fill="#a2adb1"
                    width={24}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                  <span className="menu-title">
                    <Trans>Domain Category</Trans>
                  </span>
                </Link>
              </li>

              <li
                className={
                  this.isPathActive("/admin/contact-us")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/admin/contact-us">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-envelope mr-3"
                    fill="#a2adb1"
                    width={22}
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm14 0L8 8 2 3h12zM1 4.314L8 9l7-5.686H1z" />
                  </svg>

                  <span className="menu-title">
                    <Trans>Contact us</Trans>
                  </span>
                </Link>
              </li>

              <li
                className={
                  this.isPathActive("/admin/settings")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link p-0 pl-2" to="/admin/settings">
                  <i
                    className="mdi mdi-settings mr-3"
                    style={{ fontSize: "24px" }}
                  ></i>

                  <span className="menu-title">
                    <Trans>Settings</Trans>
                  </span>
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.setState({ user: userData });
    }
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
