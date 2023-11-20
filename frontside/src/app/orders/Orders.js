import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "../../assets/custom.css";

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      showPopover: false,
      status: [
        {
          id: 1,
          label: "Pending",
        },
        {
          id: 2,
          label: "In Progress",
        },
        {
          id: 3,
          label: "Completed",
        },
        {
          id: 4,
          label: "Cancelled",
        },
        {
          id: 5,
          label: "Rajected",
        },
        {
          id: 6,
          label: "Missing Details",
        },
      ],
      projectType: [
        {
          id: 1,
          label: "Press Release",
        },
        {
          id: 2,
          label: "SEO Content",
        },
        {
          id: 3,
          label: "Google Disavow",
        },
      ],
      project: [
        {
          id: 1,
          label: "example.com",
        },
        {
          id: 2,
          label: "abc.com",
        },
        {
          id: 3,
          label: "test.org",
        },
      ],
      objectArray: [
        { key: "Option 1", cat: "Group 1" },
        { key: "Option 2", cat: "Group 1" },
        { key: "Option 3", cat: "Group 1" },
        { key: "Option 4", cat: "Group 2" },
        { key: "Option 5", cat: "Group 2" },
        { key: "Option 6", cat: "Group 2" },
        { key: "Option 7", cat: "Group 2" },
      ],
    };
  }
  togglePopover = () => {
    this.setState((prevState) => ({ showPopover: !prevState.showPopover }));
  };
  render() {
    const { showPopover } = this.state;
    const { objectArray } = this.state;
    return (
      <div className="ordersPage">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">Orders</h3>
          </div>
          <div className="ExportBtn">
            <button className="btn btn-rounded d-inline-flex btn-sm">
                <i className="mdi mdi-exit-to-app mr-2"></i>
                Export
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                <div className="d-flex justify-content-between">
                  <div className="float-left flex">
                    <form className="form-inline">
                      <div className="input-group input-focus mr-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-white customSearchIcon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              fill="currentColor"
                              className="bi bi-search"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                          </span>
                        </div>
                        <input
                          type="search"
                          placeholder="Search"
                          className="form-control border-left-0 customSearch"
                        />
                      </div>
                      <ReactMultiSelectCheckboxes
                        options={this.state.status}
                        placeholderButtonLabel="Status"
                      />
                      <ReactMultiSelectCheckboxes
                        options={this.state.projectType}
                        placeholderButtonLabel="Product Type"
                      />
                      <ReactMultiSelectCheckboxes
                        options={this.state.project}
                        placeholderButtonLabel="Project"
                      />
                      <ReactMultiSelectCheckboxes
                        options={[]}
                        placeholderButtonLabel="Date"
                      />
                    </form>
                  </div>
                  <div
                    className="float-right flex"
                    style={{ position: "relative" }}
                  >
                    <button
                      className="btn btn-rounded custamFilterBtn"
                      onClick={this.togglePopover}
                    >
                      {" "}
                      <svg
                        width={20}
                        id="adjustments"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                      Customize table
                    </button>
                    {showPopover && (
                      <div
                        className="popover bRadius"
                        style={{ top: "100%", left: 0 }}
                      >
                        <div className="popover-content">
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">ID</span>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">
                              Date & Time
                            </span>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4">Product</span>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">Status</span>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 pull-left text-nowrap">
                              Project
                            </span>
                            <label className="switch pull-right">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">
                              Anchor text
                            </span>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <center>
                    <div className="mt-5 mx-auto">
                      <img
                        src={require("../../assets/images/empty.png")}
                        alt="No data found..."
                      />
                    </div>
                    <h4>No Orders</h4>
                    <p style={{maxWidth:"400px"}}>
                      No Project You do not have any Project yet. As soon as you
                      add your first Project, it will show up here.
                    </p>
                    <button className="btn btn-rounded btn-fw">
                      <span
                        className="createProject"
                        onClick={this.showProjectModal}
                      >
                        <i className="mdi mdi-plus mr-2"></i>Create Project
                      </span>
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Orders);
