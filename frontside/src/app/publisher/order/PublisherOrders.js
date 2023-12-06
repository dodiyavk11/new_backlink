import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import TimeAgo from "timeago-react";
import { CPopover, CButton } from "@coreui/react";
import "../../../assets/custom.css";

export class PublisherOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      showPopover: false,
      selectedStatus: [],
      selectedProject: [],
      selectedProduct: [],
      date: "",
      showID: true,
      showDate: true,
      showProduct: true,
      showStatus: true,
      showProject: true,
      showAnchor: true,
      showTarget: false,
      showAmount: true,
      filterData: {},
      selectedDate: "",
      searchValue:"",
      status: [
        {
          id: 1,
          value: "Pending",
          label: "Pending",
        },
        {
          id: 2,
          value: "Inprogress",
          label: "In Progress",
        },
        {
          id: 3,
          value: "Completed",
          label: "Completed",
        },
        {
          id: 4,
          value: "Cancelled",
          label: "Cancelled",
        },
        {
          id: 5,
          value: "Rajected",
          label: "Rajected",
        },
        {
          id: 6,
          value: "Missing Details",
          label: "Missing Details",
        },
      ],
      projectType: [
        {
          id: 1,
          value: "Press Release",
          label: "Press Release",
        },
        {
          id: 2,
          value: "SEO Content",
          label: "SEO Content",
        },
        {
          id: 3,
          value: "Google Disavow",
          label: "Google Disavow",
        },
      ],
      project: [],
    };
  }
  handleStatusChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    this.setState({ selectedStatus: selectedValues }, this.updateFilterData);
  };
  handleProjectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    this.setState({ selectedProject: selectedValues }, this.updateFilterData);
  };
  handleProjectTypeChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    this.setState({ selectedProduct: selectedValues }, this.updateFilterData);
  };
  handleDateChange = (e) => {
    const { name, value } = e.target;
    this.setState({ selectedDate: value }, this.updateFilterData);
  };
  handleOnSearch = (e) => {
    this.setState({ searchValue: e.target.value }, this.updateFilterData);
  }
  toggleColumn = (columnName) => {
    this.setState((prevState) => ({
      [columnName]: !prevState[columnName],
    }));
  };
  handleCheckboxChange = (event, columnName) => {
    this.toggleColumn(columnName);
  };

  updateFilterData = () => {
    const { selectedStatus, selectedProduct, selectedProject, selectedDate,searchValue } =
      this.state;
    const filterData = {
      status: selectedStatus.length ? selectedStatus : [],
    //   productType: selectedProduct.length ? selectedProduct : {},
    //   project: selectedProject.length ? selectedProject : {},
      date: { min:selectedDate || "", max:selectedDate || "" },
      search:searchValue
    };
    ApiServices.publisherOrderFilter(filterData)
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (res.data.data) {
            this.setState({ orderData: res.data.data });
          }
        }
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          this.props.history.push("/login");
        } else {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
    this.setState({ filterData });
  };
  componentDidMount() {
    ApiServices.getPublisherOrderList()
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (res.data.data) {
            this.setState({ orderData: res.data.data });
          }
        }
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          this.props.history.push("/login");
        } else {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
    ApiServices.getPublisherDomainList().then((res) => {
      if (res.status) {
        const jsonFormat = res.data.data.map((item) => ({
          id: item.id,
          value: item.hash_id,
          label: item.domain_name,
        }));
        this.setState({ project: jsonFormat });
      }
    });
  }

  goToOrderViewLink = (order_id) => {
    this.props.history.push(`/publisher/order/${order_id}`);
  };
   
  togglePopover = () => {
    this.setState((prevState) => ({ showPopover: !prevState.showPopover }));
  };
  render() {
    const {
      showPopover,
      showAnchor,
      showDate,
      showID,
      showProduct,
      showProject,
      showStatus,
      showTarget,
      showAmount,
      searchValue
    } = this.state;
    const getStatusClass = (status) => {
      switch (status) {
        case 'Pending':
          return 'badge-primary';
        case 'Completed':
          return 'badge-success';
        case 'Cancelled':
          return 'badge-danger';
        case 'Rejected':
          return 'badge-warning';
        case 'Inprogress':
          return 'badge-secondary';
        default:
          return 'badge-info';
      }
    };
    return (
      <div className="ordersListPage">
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
                          onChange={this.handleOnSearch}
                          value={searchValue}
                          className="form-control border-left-0 customSearch"
                        />
                      </div>
                      <ReactMultiSelectCheckboxes
                        options={this.state.status}
                        placeholderButtonLabel="Status"
                        onChange={this.handleStatusChange}
                      />
                      {/* <ReactMultiSelectCheckboxes
                        options={this.state.projectType}
                        placeholderButtonLabel="Product Type"
                        onChange={this.handleProjectTypeChange}
                      /> */}
                      {/* <ReactMultiSelectCheckboxes
                        options={this.state.project}
                        placeholderButtonLabel="Domain"
                        onChange={this.handleProjectChange}
                      /> */}
                      <CPopover
                        // trigger="focus"
                        className="datepickerPopoverclass"
                      >
                        <button
                          type="button"
                          className="css-1r4vtzz custamFilterBtn"
                        >
                          <span className="css-1v99tuv">
                            <input
                              type="date"
                              placeholder="Date"
                              onChange={this.handleDateChange}
                            />
                          </span>
                          <span className="css-1gpjby2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              focusable="false"
                              role="presentation"
                            >
                              <path
                                d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
                                fill="currentColor"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </CPopover>
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
                              <input
                                type="checkbox"
                                checked={showID}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showID")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">
                              Date & Time
                            </span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={showDate}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showDate")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4">Domain</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={showProduct}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showProduct")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">Status</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={showStatus}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showStatus")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          {/* <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 pull-left text-nowrap">
                              Project
                            </span>
                            <label className="switch pull-right">
                              <input
                                type="checkbox"
                                checked={showProject}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showProject")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div> */}
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">
                              Anchor text
                            </span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={showAnchor}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showAnchor")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">Target Url</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={showTarget}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showTarget")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                            <span className="mr-4 text-nowrap">Amount</span>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={showAmount}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, "showAmount")
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {this.state.orderData.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover orderListTable">
                      <thead>
                        <tr>
                          <th className={showID ? "show" : "hide"}>ID</th>
                          <th className={showDate ? "show" : "hide"}>Date</th>
                          <th className={showStatus ? "show" : "hide"}>
                            Status
                          </th>
                          <th className={showProduct ? "show" : "hide"}>
                            Domain
                          </th>
                          {/* <th className={showProject ? "show" : "hide"}>
                            Project
                          </th> */}
                          <th className={showAnchor ? "show" : "hide"}>
                            Anchor text
                          </th>
                          <th className={showTarget ? "show" : "hide"}>
                            Target url
                          </th>
                          <th className={showAmount ? "show" : "hide"}>
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orderData.map((order) => (
                          <tr
                            key={order.id}
                            onClick={() => this.goToOrderViewLink(order.id)}
                          >
                            <td className={showID ? "show" : "hide"}>
                              {order.id}
                            </td>
                            <td className={showDate ? "show" : "hide"}>
                              {order.created_at}
                            </td>
                            <td className={showStatus ? "show" : "hide"}>
                              <span className={`fontSize13 badge ${getStatusClass(order.status)}`}>{order.status}</span>
                            </td>
                            <td className={showProduct ? "show" : "hide"}>
                              {order.domain.domain_name}
                            </td>
                            {/* <td className={showProject ? "show" : "hide"}>
                              {order.project.domain_name}
                            </td> */}
                            <td className={showAnchor ? "show" : "hide"}>
                              {order.anchortext}
                            </td>
                            <td className={showTarget ? "show" : "hide"}>
                              {order.linktarget}
                            </td>
                            <td className={showAmount ? "show" : "hide"}>
                              ${order.total_price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="">
                    <center>
                      <div className="mt-5 mx-auto">
                        <img
                          src={require("../../../assets/images/empty.png")}
                          alt="No data found..."
                        />
                      </div>
                      <h4>No Orders</h4>
                      <p style={{ maxWidth: "400px" }}>
                        No Project You do not have any Project yet. As soon as
                        you add your first Project, it will show up here.
                      </p>
                      {/* <button className="btn btn-rounded btn-fw">
                        <span
                          className="createProject"
                          onClick={this.showProjectModal}
                        >
                          <i className="mdi mdi-plus mr-2"></i>Create Project
                        </span>
                      </button> */}
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(PublisherOrders);
