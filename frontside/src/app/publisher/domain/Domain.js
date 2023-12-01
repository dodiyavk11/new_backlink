import React, { Component } from "react";
import "../../../assets/custom.css";
export class Domain extends Component {
  render() {
    return (
      <div className="dashboardHome">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">Domain</h3>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body dashboardCard">
                Domain
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Domain;
