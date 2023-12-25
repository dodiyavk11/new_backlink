import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
import { Trans,withTranslation } from "react-i18next";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      profile: "",
      password: "",
      error: "",
      isPublisher:0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const currentPath = this.props.location.pathname;
    if(currentPath === "/register/become-publisher")
    {
      this.setState({
        isPublisher : 2
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.postRegister();
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };
  handleFileInput = (e) => {
    this.setState({
      profile: e.target.files[0],
    });
  };
  postRegister() {
    const { email, password, firstName, lastName, phone,isPublisher,profile } = this.state;
    if (!password || !email || !firstName || !lastName || !phone) {
      this.setState({ error: "Please fill required fields." });
    } else {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("file", profile);
      formData.append("isPublisher", isPublisher);
      AuthService.SignUp(formData)
        .then((res) => {
          if (!res.status) {
            toast.error(res.data.message, {
              position: "top-center",
              autoClose: 2000,
            });            
          } else {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              // onClose: () => {
              //   window.location.reload();
              // },
            });
            setTimeout(() => {
              this.props.history.push("/login");
            }, 2000);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        });
    }
  }
  render() {
    const { error } = this.state;
    const { t } = this.props;
    return (
      <div className="signupPage">
        <div className="d-flex align-items-center auth px-0">
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
                  <h3 className="fontBold800 latterSpace-0025"><Trans>Sign up {this.state.isPublisher === 2 ? "for Publisher" : ""}</Trans></h3>
                  <span className="text-sm"><Trans>Register for an account in the fairlinked Marketplace.</Trans></span>
                </div>     
                <form className="pt-3" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control form-control-lg"
                      name="firstName"
                      id="exampleInputfname"
                      placeholder={t("translations:First Name *")} 
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      className="form-control form-control-lg"
                      type="text"
                      name="lastName"
                      placeholder={t("translations:Last Name *")} 
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleFileInput}
                      type="file"
                      name="profile"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder={t("translations:Email *")} 
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder={t("translations:Phone *")} 
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      name="password"
                      type="password"
                      minLength="8"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder={t("translations:Password *")} 
                    />
                    {this.state.password.length > 0 && this.state.password.length < 8 && (
                      <span style={{ color: 'red' }}><Trans>Password must be at least 8 characters long</Trans></span>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" defaultChecked className="form-check-input" />
                        <i className="input-helper"></i><Trans>I agree to all Terms &
                        Conditions</Trans>
                      </label>
                    </div>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                    >
                      <Trans>Create your free account</Trans>
                    </button>
                  </div>
                  <div className="text-center mt-4 fontBold400">
                    <Trans>Already have an{this.state.isPublisher === 2 ? " Publisher" : ""} account?</Trans>
                    <Link to="/login" className="text-primary">
                      &nbsp;<Trans>Login</Trans>
                    </Link>
                  </div>
                </form>
                <hr/>
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

// export default Register;
export default withTranslation()(Register);