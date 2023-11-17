import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
class Navbar extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      user: {},
      isAuthenticated: this.props.isAuthenticated,
    };
    this.handleLogouts = this.handleLogouts.bind(this);
  }

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
    console.log(this.props.isAuthenticated);
  };
  render() {    
    const imageUrl = `${process.env.REACT_APP_BASE_URL}/assets/profile/${this.state.user.profile}`;
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/">
            <img src={require("../../assets/images/logo_new.png")} alt="logo"/>
          </Link>          
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img
              src={require("../../assets/images/logo_new.png")}
              alt="logo"
            />
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
            {/* <li className="nav-item">
              <div>
                <div style={{cursor:'pointer',color:'#222',lineHeight: '1.5'}}>
                  <span className="font-bold text-bl-black" style={{fontWeight:'500'}}>$0.0<i style={{color:'#b66dff'}} className="mdi mdi-plus-circle"></i></span>                
                </div>
                <span className="text-sm text-bl-dark-gray" style={{color:'#222'}}>Available balance</span>
                </div>
            </li> */}
            {/* <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="mdi mdi-cart-outline"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <h6 className="p-3 mb-0">
                    <Trans>Messages</Trans>
                  </h6>
                  <div className="dropdown-divider"></div>
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
              </Dropdown>
            </li> */}
            <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="mdi mdi-bell-outline"></i>
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
                          </b><br/>
                          <span>{ this.state.user.isAdmin ? 'Admin' : 'User' }</span>
                        </Trans>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="nav-profile-img">
                    {this.state.user.profile ? (
                      <img
                        src={imageUrl}
                        alt="user"
                      />
                    ) : (
                      <img
                        src={require("../../assets/images/faces/face1.jpg")}
                        alt="user"
                      />
                    )}
                    {/* <span className="availability-status online"></span> */}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown">
                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                  >
                  <i className="mdi mdi-wallet mr-2 text-primary"></i>
                  <Trans>Payments</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                  >
                  <i className="mdi mdi-account-circle mr-2 text-primary"></i>
                  <Trans>Profile</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                  >
                  <i className="mdi mdi-account-check mr-2 text-primary"></i>
                  <Trans>Account</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                  >
                  <i className="mdi mdi-bell-ring mr-2 text-primary"></i>
                  <Trans>Notification</Trans>
                  </Dropdown.Item>
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
