import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    const { email } = this.state;
    if (!email) {
      this.setState({ error: "Email are required fields." });
    } else {
      AuthService.forgotPasswordLinkGenerate(email).then(
        (res) => {
          console.log(res)
          if(res.data.status)
          {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
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
    return (
      <div className="">
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
                    Forgot Password
                  </h3>
                </div>
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
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                    >
                      Send
                    </button>
                  </div>
                  <div className="text-center mt-4 fontBold400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Login
                    </Link>
                  </div>
                </Form>
                <hr />
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="text-sm">© se 2023</span>
                  </div>
                  <div className="">
                    <span className="text-sm loginLinks">Terms of Service</span>
                    <span className="text-sm loginLinks">Privacy Policy</span>
                    <span className="text-sm loginLinks">Imprint</span>
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

export default withRouter(ForgotPassword);
