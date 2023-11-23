import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ProtectedRoute from "../app/ProtectedRoute";
import Spinner from "../app/shared/Spinner";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Projects = lazy(() => import("./projects/Projects"));
const ContentLinks = lazy(() => import("./general-pages/ContentLinks"));
const ContentLinksHome = lazy(() => import("./contentLinks/ContentLinks"));
const LinkBundles = lazy(() => import("./linkBundle/LinkBundles"));
const Payments = lazy(() => import("./payments/Payments"));
const Profile = lazy(() => import("./setting/Profile"));
const Orders = lazy(() => import("./orders/Orders"));
const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));
const BlankPage = lazy(() => import("./general-pages/BlankPage"));

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.state = {
      isAuthenticated: !!token,
    };
  }
  handleLoginSuccess = () => {
    this.setState(
      {
        isAuthenticated: true,
      },
      () => {
        this.props.history.push("/dashboard");
      }
    );
    // window.location.reload();
  };
  isLoginPageOrRegister = () => {
    const { location } = this.props;
    return location.pathname === "/login" || location.pathname === "/register";
  };
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userData");
    this.setState({
      isAuthenticated: false,
    });
    this.props.history.push("/login");
  };
  render() {
    let navbarComponent =
      !this.isLoginPageOrRegister() && !this.state.isFullPageLayout ? (
        <Navbar handleLogout={this.handleLogout} isAuthenticated={this.state.isAuthenticated}/>
      ) : (
        ""
      );
    let sidebarComponent =
      !this.isLoginPageOrRegister() && !this.state.isFullPageLayout ? (
        <Sidebar />
      ) : (
        ""
      );
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route
                    path="/login"
                    render={(props) =>
                      this.state.isAuthenticated ? (
                        <Redirect to="/dashboard" />
                      ) : (
                        // <Route path="/login" component={(props) => <Login {...props} handleLoginSuccess={this.handleLoginSuccess} />} />
                        <Login
                          {...props}
                          handleLoginSuccess={this.handleLoginSuccess}
                        />
                      )
                    }
                  />
                  <Route path="/register" component={Register} />
                  <ProtectedRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/content/:hash_id"
                    component={ContentLinks}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/projects"
                    component={Projects}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/projects/:hash_id"
                    component={BlankPage}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/marketplace/contentlinks"
                    component={ContentLinksHome}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/orders"
                    component={Orders}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/marketplace/linkbundle"
                    component={LinkBundles}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/account/payments"
                    component={Payments}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/settings/profile"
                    component={Profile}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/settings/account"
                    component={Profile}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/settings/notifications"
                    component={Profile}
                    isAuthenticated={this.state.isAuthenticated}
                  />               
                  <ProtectedRoute
                    exact
                    path="/order/:order_id"
                    component={BlankPage}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  {/* <Route path="/login" component={ Login } /> */}
                  {/* <Route path="/login" component={(props) => <Login {...props} handleLoginSuccess={this.handleLoginSuccess} />} /> */}
                  <Redirect to="/login" />
                </Switch>
              </Suspense>
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AppRoutes);
