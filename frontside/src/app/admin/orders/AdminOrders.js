import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { CPopover, CButton } from "@coreui/react";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans, withTranslation } from "react-i18next";
import {
  Slider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

export class AdminOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      isDisable: false,
      page: 0,
      searchValue: "",
      selectedStatus: [],
      selectedProject: [],
      selectedProduct: [],
      date: "",
      rowsPerPage: 10,
      orderBy: "id",
      order: "desc",
      selectedRow: null,
      columnVisibility: {
        id: true,
        datetime: true,
        status: true,
        backlink: false,
        publisher:true,
        customer:true,
        project: false,
        anchortext: false,
        targeturl: false,
        total_price: false,
      },
      orderData: [],
      showPopover: false,
      status: [
        {
          id: 1,
          value: "Pending",
          label: <Trans>Pending</Trans>,
        },
        {
          id: 2,
          value: "Inprogress",
          label: <Trans>In Progress</Trans>,
        },
        {
          id: 3,
          value: "Completed",
          label: <Trans>Completed</Trans>,
        },
        {
          id: 4,
          value: "Cancelled",
          label: <Trans>Cancelled</Trans>,
        },
        {
          id: 5,
          value: "Rejected",
          label: <Trans>Rejected</Trans>,
        },
        {
          id: 6,
          value: "MissingDetails",
          label: <Trans>Missing Details</Trans>,
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

  // Datatable start
  // handleRowClick = (event, index) => {
  //   // if (event.target.tagName === "TD") {
  //   this.setState({ selectedRow: index });
  //   // }
  // };

  gotoViewOrder = (id, event, index) => {
    const nonClickableTags = ["button", "svg", "path"];
    if (!nonClickableTags.includes(event.target.tagName.toLowerCase())) {
      this.props.history.push(`/admin/order/${id}`);
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  handleRequestSort = (property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({
      orderBy: property,
      order: isAsc ? "desc" : "asc",
    });
  };

  getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => b[orderBy] - a[orderBy]
      : (a, b) => a[orderBy] - b[orderBy];
  };

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  // Datatable End

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
  };

  togglePopover = () => {
    this.setState((prevState) => ({ showPopover: !prevState.showPopover }));
  };

  handleToggleColumnVisibility = (columnId) => {
    this.setState((prevState) => {
      const updatedVisibility = {
        ...prevState.columnVisibility,
        [columnId]: !prevState.columnVisibility[columnId],
      };
      return { columnVisibility: updatedVisibility };
    });
  };

  handleOpenContentDomain = (url) => {
    window.open("https://" + url, "_blank");
  };
  updateFilterData = () => {
    this.setState({
      isDisable: true,
    });
    const {
      selectedStatus,
      selectedProduct,
      selectedProject,
      selectedDate,
      searchValue,
    } = this.state;
    const filterData = {
      status: selectedStatus.length ? selectedStatus : [],
      productType: selectedProduct.length ? selectedProduct : {},
      project: selectedProject.length ? selectedProject : {},
      date: { min: selectedDate || "", max: selectedDate || "" },
      search: searchValue,
    };
    this.fetchAdminOrder(filterData);
  };

  fetchAdminOrder(filter = null) {
    ApiServices.adminGetAllOrders(filter).then(
      (res) => {
        if (res.data.status) {
          this.setState({
            rows: res.data.data,
            isDisable: false,
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

  componentDidMount() {
    this.fetchAdminOrder();    
  }
  render() {
    const {
      min,
      rows,
      max,
      page,
      rowsPerPage,
      orderBy,
      order,
      isDisable,
      searchValue,
      columnVisibility,
      showPopover,
      favoriteProducts,
    } = this.state;
    const { t } = this.props;
    const getStatusClass = (status) => {
      switch (status) {
        case "Pending":
          return "badge-primary";
        case "Completed":
          return "badge-success";
        case "Cancelled":
          return "badge-danger";
        case "Rejected":
          return "badge-warning";
        case "Inprogress":
          return "badge-secondary";
        default:
          return "badge-info";
      }
    };
    const columns = [
      {
        id: "id",
        label: <Trans>ID</Trans>,
        height: 100,
        width: 50,
        sortable: true,
        renderCell: (row) => <span>{row.id}</span>,
      },
      {
        id: "datetime",
        label: <Trans>Order Date</Trans>,
        width: 130,
        sortable: false,
        renderCell: (row) => <span>{row.created_at}</span>,
      },
      {
        id: "status",
        label: <Trans>Status</Trans>,
        width: 90,
        sortable: false,
        renderCell: (row) => (
          <span className={`fontSize13 badge ${getStatusClass(row.status)}`}>
            {row.status}
          </span>
        ),
      },
      {
        id: "backlink",
        label: <Trans>Backlink</Trans>,
        width: 130,
        align: "right",
        sortable: false,
        renderCell: (row) => (
          <span>
            {row.isBundle !== 0 ? "Link Bundle" : row.domain.domain_name}
          </span>
        ),
      },
      {
        id: "project",
        label: <Trans>Project</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => (
          <span>{row.project ? row.project.domain_name : "N/A"}</span>
        ),
      },
      {
        id: "customer",
        label: <Trans>Customer</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => <span>{row.customer ? `${row.customer.firstName} ${row.customer.lastName}` : "N/A"}</span>,
      },
      {
        id: "publisher",
        label: <Trans>Advertiser</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => <span>{row.publisher ? `${row.publisher.firstName} ${row.publisher.lastName}` : "N/A"}</span>,
      },
      {
        id: "anchortext",
        label: <Trans>Anchor text</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => <span>{row.anchortext}</span>,
      },
      {
        id: "targeturl",
        label: <Trans>Target Url</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => (
          <span>
            {row.linktarget.length > 10
              ? row.linktarget.slice(0, 10) + "..."
              : row.linktarget}
          </span>
        ),
      },
      {
        id: "total_price",
        label: <Trans>Amount</Trans>,
        sortable: true,
        width: 90,
        renderCell: (row) => <span>${row.total_price}</span>,
      },
    ];

    return (
      <>
        <div className="ordersListPage adminOrdersList">
          <div className="d-flex justify-content-between">
            <div className="page-header">
              <h3 className="fontBold latterSpacing">
                <Trans>Orders</Trans>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 bRadius">
                <div className="card-body projectsCard">
                  <ToastContainer />
                  <div className="d-flex justify-content-between MarketPlaceTab">
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
                              // placeholder="Search backlink"
                              placeholder={t("Search backlink")}
                              className="form-control border-left-0 customSearch p-0"
                              onChange={this.handleOnSearch}
                              value={searchValue}
                            />
                          </div>
                          <ReactMultiSelectCheckboxes
                            options={this.state.status}
                            placeholderButtonLabel={t("Status")}
                            onChange={this.handleStatusChange}
                          />
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
                      <div>
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
                            <Trans>Customize table</Trans>
                          </button>
                          {showPopover && (
                            <div
                              className="popover bRadius"
                              style={{ top: "100%", left: 0 }}
                            >
                              <div className="popover-content">
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    Datetime
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.datetime}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "datetime"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    <Trans>Status</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.status}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "status"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4">
                                    <Trans>Backlink</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.backlink}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "backlink"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    <Trans>Project</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.project}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "project"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    <Trans>Customer</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.customer}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "customer"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    <Trans>Advertiser</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.publisher}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "publisher"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 pull-left text-nowrap">
                                    <Trans>Anchor text</Trans>
                                  </span>
                                  <label className="switch pull-right">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.anchortext}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "anchortext"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    <Trans>Target url</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.targeturl}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "targeturl"
                                        )
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 bdr">
                                  <span className="mr-4 text-nowrap">
                                    <Trans>Amount</Trans>
                                  </span>
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={columnVisibility.total_price}
                                      onClick={() =>
                                        this.handleToggleColumnVisibility(
                                          "total_price"
                                        )
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
                  </div>
                  <hr style={{ marginBottom: "0px" }} />
                  <div
                    className={`tableData ${isDisable ? "disabled-div" : ""}`}
                  >
                    <Paper style={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) =>
                                this.state.columnVisibility[column.id] ? (
                                  <TableCell
                                    className="text-uppercase"
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                  >
                                    {column.sortable !== false ? (
                                      <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={
                                          orderBy === column.id ? order : "asc"
                                        }
                                        onClick={() =>
                                          this.handleRequestSort(column.id)
                                        }
                                      >
                                        {column.label}
                                      </TableSortLabel>
                                    ) : (
                                      <span>{column.label}</span>
                                    )}
                                  </TableCell>
                                ) : null
                              )}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.stableSort(
                              rows,
                              this.getComparator(order, orderBy)
                            )
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row, index) => {
                                const isSelected =
                                  this.state.selectedRow === index;
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isSelected}
                                    onClick={(event) =>
                                      this.gotoViewOrder(row.id, event, index)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      height: "55px",
                                    }}
                                  >
                                    {columns.map(
                                      (column) =>
                                        this.state.columnVisibility[
                                          column.id
                                        ] && (
                                          <TableCell
                                            className="fontBold600"
                                            key={column.id}
                                            align={column.align}
                                          >
                                            {column.renderCell
                                              ? column.renderCell(row)
                                              : column.format &&
                                                typeof row[column.id] ===
                                                  "number"
                                              ? column.format(row[column.id])
                                              : row[column.id]}
                                          </TableCell>
                                        )
                                    )}
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                      />
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const PriceRangeSlider = (props) => {
  const { min, max, handleSliderChange, handleInputChange } = props;
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }} className="mb-2">
        <input
          className="form-control form-control inpRound mr-2"
          value={min}
          type="number"
          onChange={(e) => handleInputChange(e, "min")}
          aria-labelledby="input-slider"
          step={1}
          min={0}
          max={200000}
        />
        <input
          className="form-control form-control inpRound"
          value={max}
          type="number"
          onChange={(e) => handleInputChange(e, "max")}
          aria-labelledby="input-slider"
          step={1}
          min={0}
          max={200000}
        />
      </div>
      <Slider
        value={[min, max]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={30}
        max={200000}
        style={{ color: "#ff9756" }}
      />
    </>
  );
};
// export default withRouter(AdminOrders);
export default withTranslation()(AdminOrders);
