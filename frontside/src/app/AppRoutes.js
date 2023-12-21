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
const AdminDashboard = lazy(() => import("./admin/dashboard/Dashboard"));
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
const Users = lazy(() => import("./admin/users/Users"));
const AdminOrders = lazy(() => import("./admin/orders/AdminOrders"));
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
const PublisherOrders = lazy(() => import("./publisher/order/PublisherOrders"));
const PublisherViewOrderDetails = lazy(() =>
  import("./publisher/order/PublisherViewOrderDetails")
);
const PublisherMessages = lazy(() => import("./publisher/message/Messages"));
const UserViewOrderDetails = lazy(() =>
  import("./orders/UserViewOrderDetails")
);
const AdminViewOrderDetails = lazy(() =>
  import("./admin/orders/AdminViewOrderDetails")
);
const AdminProjectView = lazy(() => import("./admin/projects/ProjectView"));
const emailTemplate = lazy(() => import("./admin/email/EmailTemplate"));
const domainCategory = lazy(() => import("./admin/category/DomainCategory"));
const ProjectView = lazy(() => import("./projects/ProjectView"));
const DomainView = lazy(() => import("./publisher/domain/DomainView"));
const CartPage = lazy(() => import("./shared/Cart"));
const paymentSuccess = lazy(()=> import("./paymentSuccess"));
class AppRoutes extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    this.state = {
      isAuthenticated: !!token,
      isAdmin: isAdmin,
      cartLength: 0,
      cartData: [],
    };
    this.updateCartLength = this.updateCartLength.bind(this);
  }
  handleLoginSuccess = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    this.setState(
      {
        isAuthenticated: true,
        isAdmin: isAdmin,
      },
      () => {
        if (isAdmin === "1") {
          this.props.history.push("/admin/orders");
        } else if (isAdmin === "2") {
          this.props.history.push("/publisher/domain");
        } else {
          this.props.history.push("/dashboard");
        }
        // this.props.history.push("/dashboard");
      }
    );
    // window.location.reload();
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
    this.setState({
      isAuthenticated: false,
    });
    this.props.history.push("/login");
  };
  updateCartLength = (newCartLength) => {
    this.setState({ cartLength: newCartLength });
    this.getCartData();
  };
  getCartData = () => {
    ApiServices.getUserCartData().then(
      (res) => {
        if (res.data.status) {
          this.setState({
            cartLength: res.data.data.length,
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
        // alert(resMessage);
      }
    );
  };
  handleAddtoCart = (hash_id) => {
    ApiServices.addToCartContentLink(hash_id).then(
      (res) => {
        if (res.data.status) {
          this.setState({
            cartLength: res.data.data.length,
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
        // toast.error(resMessage, {
        //   position: "top-center",
        //   autoClose: 2000,
        // });
      }
    );
  };
  componentDidMount() {
    this.getCartData();
  }
  render() {
    let navbarComponent =
      !this.isLoginPageOrRegister() && !this.state.isFullPageLayout ? (
        <Navbar
          handleLogout={this.handleLogout}
          isAuthenticated={this.state.isAuthenticated}
          cartLength={this.state.cartLength}
          updateCartLength={this.updateCartLength}
          getCartData={this.getCartData}
          cartData={this.state.cartData}
        />
      ) : (
        ""
      );
    let sidebarComponent =
      !this.isLoginPageOrRegister() && !this.state.isFullPageLayout ? (
        <Sidebar
          isAuthenticated={this.state.isAuthenticated}
          isAdmin={this.state.isAdmin}
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
                  {/* <Route
                    path="/login"
                    render={(props) =>
                      this.state.isAuthenticated ? (
                        this.state.isAdmin ? (
                          <Redirect to="/admin/dashboard" />
                        ) : (
                          <Redirect to="/dashboard" />
                        )
                      ) : (
                        <Login
                          {...props}
                          handleLoginSuccess={this.handleLoginSuccess}
                        />
                      )
                    }
                  /> */}
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
                    handleAddtoCart={this.handleAddtoCart}
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
                    cartLength={this.state.cartLength}
                    updateCartLength={this.updateCartLength}
                    handleAddtoCart={this.handleAddtoCart}
                    getCartData={this.getCartData}
                    cartData={this.state.cartData}
                  />
                  <ProtectedRoute
                    exact
                    path="/orders"
                    component={Orders}
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
                  <ProtectedRoute
                    exact
                    path="/cart"
                    component={CartPage}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                    cartLength={this.state.cartLength}
                    updateCartLength={this.updateCartLength}
                    getCartData={this.getCartData}
                    cartData={this.state.cartData}
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
                  <ProtectedRoute
                    exact
                    path="/order/:order_id"
                    component={UserViewOrderDetails}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />

                  <AdminProtected
                    exact
                    path="/admin/dashboard"
                    component={AdminDashboard}
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
                    path="/admin/orders"
                    component={AdminOrders}
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
                    path="/admin/order/:order_id"
                    component={AdminViewOrderDetails}
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

                  <PublisherProtected
                    exact
                    path="/publisher/domain"
                    component={publisherDomain}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
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
                    path="/publisher/orders"
                    component={PublisherOrders}
                    isAuthenticated={this.state.isAuthenticated}
                    isAdmin={this.state.isAdmin}
                  />
                  <PublisherProtected
                    exact
                    path="/publisher/order/:order_id"
                    component={PublisherViewOrderDetails}
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
                    path="/publisher/messages"
                    component={PublisherMessages}
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
