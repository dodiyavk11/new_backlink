import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Trans } from "react-i18next";

class paymentSuccess extends Component {
  render() {
    return (
      <div className="dashboardHome">
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body dashboardCard">
                <center>
                  <img
                    src={require("../assets/images/payment_success.gif")}
                    alt="Success"
                    height={450}
                  />
                 <h3 className="text-success"><Trans>Payment success</Trans></h3>
                  <Link to="/dashboard" className="hrefTitle btn btn-rounded btn-fw mt-3">
                    <i className="mdi mdi-arrow-left-bold mr-2"></i> <Trans>Home</Trans>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(paymentSuccess);
