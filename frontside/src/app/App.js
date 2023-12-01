import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./AppRoutes";

import { withTranslation } from "react-i18next";

class App extends Component {
  state = {};
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    return <AppRoutes />;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const { i18n } = this.props;
    const body = document.querySelector("body");
    if (this.props.location.pathname === "/layout/RtlLayout") {
      body.classList.add("rtl");
      i18n.changeLanguage("ar");
    } else {
      body.classList.remove("rtl");
      i18n.changeLanguage("en");
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/forgotPassword/:token",
      "/register/become-publisher",
    ];
    const { location } = this.props;
    const forgotPasswordPattern = /^\/forgotPassword\/[a-zA-Z0-9._-]+$/;
    const isForgotPasswordTokenPath = forgotPasswordPattern.test(
      location.pathname
    );

    const verifyEmailPattern = /^\/verify\/email\/[a-zA-Z0-9._-]+$/;
    const isVerifyEmail = verifyEmailPattern.test(
      location.pathname
    );

    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
    if(isForgotPasswordTokenPath || isVerifyEmail)
    {
      this.setState({
        isFullPageLayout: true,
      });
      document
        .querySelector(".page-body-wrapper")
        .classList.add("full-page-wrapper");
    }
  }
}

export default withTranslation()(withRouter(App));
