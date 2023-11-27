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
      isLoading: false,
      error: "",
      success:""
    };
  }
  componentDidMount() {
    this.postVerifyDetails();
  }

  postVerifyDetails = () => {
    const { match } = this.props;
    const token = match.params.token;
    AuthService.verifyEmail(token).then(
      (res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
          this.setState({ 
            success: res.data.message,
            isLoading:false
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
          this.setState({ 
            error: resMessage,
            success:"",
            isLoading:false
          });
      }
    );
  };
  gotoSignUpPage = () => {
    this.props.history.push("/register");
  };
  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh",
    };

    const donutStyle = {
      width: "4rem",
      height: "4rem",
      borderRadius: "50%",
      border: "0.3rem solid rgba(151, 159, 208, 0.3)",
      borderTopColor: "#979fd0",
      animation: "1.5s spin infinite linear",
    };
    const { isLoading, error,success } = this.state;
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
                  <h3 className="fontBold800 latterSpace-0025">Verify Email</h3>                  
                </div>
                {isLoading ? (
                  <div className="text-center">
                    <div style={containerStyle}>
                      <div style={donutStyle} className="donut"></div>
                    </div>
                    <p>Please wait...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                )}
                <div className="text-center">
                    {success && <p className="text-success">{success}</p>}
                  </div>
                <div className="text-center mt-4 fontBold400">
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </div>
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
