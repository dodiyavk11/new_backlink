import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../../assets/custom.css";
export class TableFilter extends Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Language</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Rating</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4">Ahrefs Domain Rating</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Moz Domain Authority</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 pull-left text-nowrap">
            Sistrix Visibility Index
          </span>
          <label className="switch pull-right">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Majestic Trustflow</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Ahrefs Referring Domains</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Traffic</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </>
    );
  }
}
export default withRouter(TableFilter);
