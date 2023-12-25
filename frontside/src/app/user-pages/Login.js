import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { Trans,withTranslation } from "react-i18next";
import "../../assets/custom.css";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.postLoginDetails();
  };
  postLoginDetails = () => {
    const { email, password } = this.state;
    if (!password || !email) {
      this.setState({ error: "Email and Password are required fields." });
    } else {
      AuthService.login(email, password).then(
        () => {
          this.props.handleLoginSuccess();
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
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };
  gotoSignUpPage = () => {
    this.props.history.push("/register");
  };
  render() {
    const { password, email, error } = this.state;
    const { t } = this.props;
    return (
      <div className="loginPage">
        <div className="d-flex align-items-center auth px-0 bgColor">
          <ToastContainer />
          <div className="row w-100 mx-0">
            <div className="col-lg-5 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5 bRadius">
                <div className="brand-logo text-center">
                  <img
                    src={require("../../assets/images/logo_new.png")}
                    alt="logo"
                  />
                </div>
                <div className="text-center">
                  <h3 className="fontBold800 latterSpace-0025">
                    <Trans>Sign in</Trans>
                  </h3>
                  <span className="text-sm"><Trans>Great to have you back.</Trans></span>
                </div>
                <Form className="pt-3" onSubmit={this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder={t('Email *')}
                      size="lg"
                      name="email"
                      className="h-auto"
                      value={email}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder={t('Password *')}
                      size="lg"
                      name="password"
                      className="h-auto"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        <Trans>Keep me signed in</Trans>
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-primary">
                      <Trans>Forgot password?</Trans>
                    </Link>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                    >
                      <Trans>SIGN IN</Trans>
                    </button>
                  </div>
                  <div className="text-center mt-4 fontBold400">
                  <Trans>Don't have an account?</Trans>{" "}
                    <Link to="/register" className="text-primary">
                      <Trans>Sign up</Trans>
                    </Link>
                  </div>
                  <div className="text-center mt-4 fontBold400">
                    <b><Trans>Become a publisher?</Trans> </b>
                    <Link
                      to="/register/become-publisher"
                      className="text-primary"
                    >
                      <Trans>Sign up</Trans>
                    </Link>
                  </div>
                </Form>
                <hr />
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="text-sm">© se 2023</span>
                  </div>
                  <div className="">
                    <span className="text-sm loginLinks"><Trans>Terms of Service</Trans></span>
                    <span className="text-sm loginLinks"><Trans>Privacy Policy</Trans></span>
                    <span className="text-sm loginLinks"><Trans>Imprint</Trans></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default withRouter(Login);
export default withTranslation()(withRouter(Login));
