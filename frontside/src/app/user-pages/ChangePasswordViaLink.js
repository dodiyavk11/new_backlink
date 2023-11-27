import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import "../../assets/custom.css";
export class ChangePasswordViaLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      cPassword: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();    
    const { password, cPassword } = this.state;
    if (!password || !cPassword) {
      this.setState({ error: "Password and Confirm Password are required fields." });
    } else if (password !== cPassword) {
      this.setState({ error: "Password and Confirm Password do not match." });
    } else {    
      this.postChnagePasswordDetails();
    }    
  };
  postChnagePasswordDetails = () => {
    const { match } = this.props;
    const token = match.params.token;
    const { password,cPassword } = this.state;    
      AuthService.tokenToChangePassword(password,token).then(
        (res) => {
          if(res.data.status)
          {            
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
            });
            setTimeout(() => {
              this.props.history.push("/login");
            }, 2000);
          }          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            if(error.response.data.error === "jwt expired")
            {
              toast.error("Your link expired", {
                position: "top-center",
                autoClose: 2000,
              });
            }
            else{
              toast.error(resMessage, {
                position: "top-center",
                autoClose: 2000,
              });
            }          
        }
      );
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
    const { password,cPassword, error } = this.state;
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
                    Chnage password
                  </h3>
                </div>
                <Form className="pt-3" onSubmit={this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder="New password"
                      size="lg"
                      name="password"
                      className="h-auto"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      size="lg"
                      name="cPassword"
                      className="h-auto"
                      value={cPassword}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                    >
                      Change
                    </button>
                  </div>
                  <div className="text-center mt-4 fontBold400">
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

export default withRouter(ChangePasswordViaLink);
