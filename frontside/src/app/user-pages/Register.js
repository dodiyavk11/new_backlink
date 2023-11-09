import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const { email, password, firstName, lastName, phone } = this.state;
    if (!password || !email || !firstName || !lastName || !phone) {
      this.setState({ error: "Please fill required fields." });
    } else {
      const formData = new FormData();
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("email", this.state.email);
      formData.append("phone", this.state.phone);
      formData.append("password", this.state.password);
      formData.append("file", this.state.profile);
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
              onClose: () => {
                window.location.reload();
              },
            });
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
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <ToastContainer />
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-center">
                  <img
                    src={require("../../assets/images/logo_new.png")}
                    alt="logo"
                  />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">
                  Signing up is easy. It only takes a few steps
                </h6>
                <form className="pt-3" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control form-control-lg"
                      name="firstName"
                      id="exampleInputfname"
                      placeholder="First Name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      className="form-control form-control-lg"
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
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
                      placeholder="Email *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="Phone *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleInputChange}
                      name="password"
                      type="password"
                      minlength="8"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password *"
                    />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" defaultChecked className="form-check-input" />
                        <i className="input-helper"></i>I agree to all Terms &
                        Conditions
                      </label>
                    </div>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
