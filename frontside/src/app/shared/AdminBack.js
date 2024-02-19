import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";

export class AdminBack extends Component {
  handleBackAdmin = () => {
    const adminLogin = localStorage.getItem("adminLogin");
    const adminToken = localStorage.getItem("adminToken");
    const isAdmin = localStorage.getItem("isAdmin");
    const userData = localStorage.getItem("adminUser");

    localStorage.setItem("userData", userData);
    localStorage.setItem("isAdmin", 1);
    localStorage.setItem("token", adminToken);
    setTimeout(() => {
      window.location.href = "/admin/users";
    }, 100);
  };
  render() {
    const adminLogin = localStorage.getItem("adminLogin");
    const adminToken = localStorage.getItem("adminToken");
    const isAdmin = localStorage.getItem("isAdmin");
    return (
      <>
        {adminLogin === "1" &&
          adminToken !== "" &&
          (isAdmin === "0" || isAdmin === "2") && (
            <button
              className="btn btn-info btn-sm"
              onClick={() => this.handleBackAdmin()}
              style={{
                borderRadius: "50px",
                backgroundColor: "#2196f3",
                borderColor: "#2196f3",
              }}
            >
              <Trans>Back to Admin</Trans>
            </button>
          )}
      </>
    );
  }
}
export default withTranslation()(withRouter(AdminBack));
