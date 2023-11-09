import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
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
          // this.props.router.navigate("/dashboard");
          // this.props.history.push('/dashboard');
          // window.location.reload();
        },
        error => {
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
        });
      // fetch("http://localhost:3000/signin", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email: email,
      //     password: password,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (!data.status) {
      //       toast.error(data.message, {
      //         position: "top-center",
      //         autoClose: 2000,
      //       });
      //     } else {
      //       localStorage.setItem("email", data.data.email);
      //       localStorage.setItem("token", data.token);
      //       localStorage.setItem("userData", JSON.stringify(data.data));
      //       window.location.reload();
      //     }
      //   })
      //   .catch((err) => console.error(err));
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
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit={this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder="Email"
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
                      placeholder="Password"
                      size="lg"
                      name="password"
                      className="h-auto"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a
                      href="!#"
                      onClick={(event) => event.preventDefault()}
                      className="auth-link text-black"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Create
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
