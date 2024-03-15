import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ProtectedRoute from "../app/ProtectedRoute";
import AdminProtected from "../app/AdminProtected";
import PublisherProtected from "./PublisherProtected";
import AuthProtected from "../app/AuthProtected";
import Spinner from "../app/shared/Spinner";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";
import ApiServices from "./services/api.service";
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Projects = lazy(() => import("./projects/Projects"));
const ContentLinks = lazy(() => import("./general-pages/ContentLinks"));
const ContentLinksHome = lazy(() => import("./contentLinks/ContentLinks"));
const LinkBundles = lazy(() => import("./linkBundle/LinkBundles"));
const Payments = lazy(() => import("./payments/Payments"));
const Profile = lazy(() => import("./setting/Profile"));
const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));
const BlankPage = lazy(() => import("./general-pages/BlankPage"));
const Users = lazy(() => import("./admin/users/Users"));
const Plan = lazy(() => import("./admin/plan/Plan"));
const AdminContentLinks = lazy(() =>
  import("./admin/contentLinks/ContentLinks")
);

const AdminBacklinkView = lazy(() =>
  import("./admin/contentLinks/BacklinkView")
);

const AdminProjects = lazy(() => import("./admin/projects/Projects"));
const ForgotPassword = lazy(() => import("./user-pages/ForgotPassword"));
const ChangePasswordViaLink = lazy(() =>
  import("./user-pages/ChangePasswordViaLink")
);
const VerifyEmail = lazy(() => import("./user-pages/VerifyEmail"));
const publisherDomain = lazy(() => import("./publisher/domain/Domain"));
const AdminProjectView = lazy(() => import("./admin/projects/ProjectView"));
const emailTemplate = lazy(() => import("./admin/email/EmailTemplate"));
const domainCategory = lazy(() => import("./admin/category/DomainCategory"));
const ProjectView = lazy(() => import("./projects/ProjectView"));
const DomainView = lazy(() => import("./publisher/domain/DomainView"));
const paymentSuccess = lazy(() => import("./paymentSuccess"));
const ContactUs = lazy(() => import("./admin/contactUs/ContactUs"));
const Settings = lazy(() => import("./admin/setting/Settings"));
const AdminPayments = lazy(() => import("./admin/payments/Payments"));
const PublisherPayments = lazy(() => import("./publisher/payments/Payments"));
const DomainRevealRequest = lazy(() =>
  import("./publisher/notification/DomainRevealRequest")
);

const SubscriptionPlan = lazy(() => import("./admin/subscription/Subscription"));

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    this.state = {
      isAuthenticated: !!token,
      isAdmin: isAdmin,
      unRead: 0,
    };
  }
  handleLoginSuccess = (is) => {
    const isAdmin = localStorage.getItem("isAdmin");
    this.setState(
      {
        isAuthenticated: true,
        isAdmin: isAdmin,
      },
      () => {
        if (isAdmin === "1") {
          const adminToken = localStorage.getItem("token");
          localStorage.setItem("adminToken", adminToken);
          localStorage.setItem("adminLogin", 1);
          const userData = localStorage.getItem("userData");
          localStorage.setItem("adminUser", userData);
          this.props.history.push("/admin/contentlinks");
        } else if (isAdmin === "2") {
          if (is) {
            window.location.href = "/publisher/domain";
          } else {
            this.props.history.push("/publisher/domain");
          }
        } else {
          if (is) {
            window.location.href = "/dashboard";
          } else {
            this.props.history.push("/dashboard");
          }
        }
      }
    );
  };

  isLoginPageOrRegister = () => {
    const { location } = this.props;
    const forgotPasswordPattern = /^\/forgotPassword\/[a-zA-Z0-9._-]+$/;
    const isForgotPasswordTokenPath = forgotPasswordPattern.test(
      location.pathname
    );

    const verifyEmailPattern = /^\/verify\/email\/[a-zA-Z0-9._-]+$/;
    const isVerifyEmail = verifyEmailPattern.test(location.pathname);
    return (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/register/become-publisher" ||
      isForgotPasswordTokenPath ||
      isVerifyEmail
    );
  };
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userData");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLogin");
    localStorage.removeItem("adminUser");
    this.setState({
      isAuthenticated: false,
    });
    this.props.history.push("/login");
  };
  publisherUnreadMessageCount = () => {
    // ApiServices.publisherUnreadMessageCount().then(
    //   (res) => {
    //     if (res.data.status) {
    //       this.setState({
    //         unRead: res.data.data,
    //       });
    //     }
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  };
  publisherReadMessage = (id) => {
    // ApiServices.publisherReadMessage(id).then(
    //   (res) => {
    //     if (res.data.status) {
    //       this.setState({
    //         unRead: res.data.data,
    //       });
    //     }
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  };
  componentDidMount() {
    this.publisherUnreadMessageCount();
  }
  render() {
    let navbarComponent =
      !this.isLoginPageOrRegister() && !this.state.isFullPageLayout ? (
        <Navbar
          handleLogout={this.handleLogout}
          isAuthenticated={this.state.isAuthenticated}
        />
      ) : (
        ""
      );
    let sidebarComponent =
      !this.isLoginPageOrRegister() && !this.state.isFullPageLayout ? (
        <Sidebar
          isAuthenticated={this.state.isAuthenticated}
          isAdmin={this.state.isAdmin}
          unRead={this.state.unRead}
        />
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
                    render={(props) => (
                      <Login
                        {...props}
                        handleLoginSuccess={this.handleLoginSuccess}
                      />
                    )}
                  />

                  <Route path="/register" component={Register} />
                  <Route
                    path="/register/become-publisher"
                    component={Register}
                  />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route
                    path="/forgotPassword/:token"
                    component={ChangePasswordViaLink}
                  />
                  <Route path="/verify/email/:token" component={VerifyEmail} />

                  <ProtectedRoute
                    exact
                    path="/payment-success"
                    component={paymentSuccess}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <ProtectedRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <ProtectedRoute
                    exact
                    path="/content/:hash_id"
                    component={ContentLinks}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <ProtectedRoute
                    exact
                    path="/projects"
                    component={Projects}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <ProtectedRoute
                    exact
                    path="/projects/:hash_id"
                    component={ProjectView}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <ProtectedRoute
                    exact
                    path="/marketplace/contentlinks"
                    component={ContentLinksHome}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <ProtectedRoute
                    exact
                    path="/marketplace/linkbundle"
                    component={LinkBundles}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <ProtectedRoute
                    exact
                    path="/account/payments"
                    component={Payments}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AuthProtected
                    exact
                    path="/settings/profile"
                    component={Profile}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AuthProtected
                    exact
                    path="/settings/account"
                    component={Profile}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AuthProtected
                    exact
                    path="/settings/notifications"
                    component={Profile}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/users"
                    component={Users}
                    handleLoginSuccess={this.handleLoginSuccess}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AdminProtected
                    exact
                    path="/admin/plan"
                    component={Plan}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/subscription"
                    component={SubscriptionPlan}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/contentlinks"
                    component={AdminContentLinks}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AdminProtected
                    exact
                    path="/admin/contentlinks/:hash_id"
                    component={AdminBacklinkView}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AdminProtected
                    exact
                    path="/admin/projects"
                    component={AdminProjects}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/project/:hash_id"
                    component={AdminProjectView}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AdminProtected
                    exact
                    path="/admin/emailTemplate"
                    component={emailTemplate}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <AdminProtected
                    exact
                    path="/admin/domainCategory"
                    component={domainCategory}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/contact-us"
                    component={ContactUs}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/settings"
                    component={Settings}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/payments"
                    component={AdminPayments}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <PublisherProtected
                    exact
                    path="/publisher/domain"
                    component={publisherDomain}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                    publisherUnreadMessageCount={
                      this.publisherUnreadMessageCount
                    }
                  />
                  <PublisherProtected
                    exact
                    path="/domain/:hash_id"
                    component={BlankPage}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <PublisherProtected
                    exact
                    path="/publisher/request-domain"
                    component={DomainRevealRequest}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <PublisherProtected
                    exact
                    path="/publisher/domain/:hash_id"
                    component={DomainView}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <PublisherProtected
                    exact
                    path="/publisher/payments"
                    component={PublisherPayments}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
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
