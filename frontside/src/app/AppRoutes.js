import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ProtectedRoute from "../app/ProtectedRoute";
import Spinner from "../app/shared/Spinner";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const ContentLinks = lazy(() => import("./general-pages/ContentLinks"));
const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));
const BasicElements = lazy(() => import("./form-elements/BasicElements"));
const BasicTable = lazy(() => import("./tables/BasicTable"));
const Mdi = lazy(() => import("./icons/Mdi"));
const ChartJs = lazy(() => import("./charts/ChartJs"));
const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));
const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));
const Lockscreen = lazy(() => import("./user-pages/Lockscreen"));
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
                    path="/basic-ui/buttons"
                    component={Buttons}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/basic-ui/dropdowns"
                    component={Dropdowns}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/basic-ui/typography"
                    component={Typography}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/form-Elements/basic-elements"
                    component={BasicElements}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/tables/basic-table"
                    component={BasicTable}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/tables/basic-table-2"
                    component={BasicTable}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <Route exact path="/icons/mdi" component={Mdi} />
                  <ProtectedRoute
                    exact
                    path="/charts/chart-js"
                    component={ChartJs}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/user-pages/lockscreen"
                    component={Lockscreen}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/error-pages/error-404"
                    component={Error404}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/error-pages/error-500"
                    component={Error500}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                  <ProtectedRoute
                    exact
                    path="/general-pages/blank-page"
                    component={BlankPage}
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
