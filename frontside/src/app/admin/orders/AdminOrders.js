import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "../../../assets/custom.css";
import {
    Typography,
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
      orderData: [],
      showPopover: false,
      page: 0,
      rowsPerPage: 10,
      orderBy: "name",
      order: "asc",
      selectedRow: null,
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
  handleRowClick = (event, index) => {
    if (event.target.tagName === "TD") {
      this.setState({ selectedRow: index });
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
  render() {
    const { showPopover, page, rowsPerPage, orderBy, order } = this.state;
    const columns = [
      {
        id: "name",
        label: "Name",
        height: 70,
        width: 345,
        sortable: false,
        renderCell: (row) => (
          <div style={{ display: "flex" }}>
            <button className="customBtn2 mr-2">
              <svg
                width={24}
                id="lock-closed"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </button>
            <div className="block">
              <Typography className="fontBold600">{row.name}</Typography>
              <Typography className="font-light text-sm customTextTable">
                {" "}
                sdfsdfsdfsdfsdfsdfsdf
              </Typography>
            </div>
          </div>
        ),
      },
      {
        id: "language",
        label: "Language",
        width: 130,
        sortable: false,
        renderCell: (row) => (
          <div>
            <img src={require("../../../assets/images/US.svg")} /> EN
          </div>
        ),
      },
      {
        id: "rating",
        label: "Rating",
        width: 130,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
        renderCell: (row) => (
          <div className="flex">
            <span
              className="text-yellow-700"
              style={{ transform: "scale(0.6)" }}
            >
              <svg
                className="mr-1"
                width={15}
                id="star"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fbc02d"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "#fbc02d" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              {row.rating}
            </span>
          </div>
        ),
      },
      {
        id: "dr",
        label: "DR",
        align: "right",
        width: 90,
      },
      {
        id: "da",
        label: "DA",
        align: "right",
        width: 90,
      },
      {
        id: "traffic",
        label: "TRAFFIC",
        width: 90,
        align: "right",
      },
      {
        id: "price",
        label: "PRICE",
        width: 160,
        align: "right",
      },
      {
        id: "aciton",
        label: "",
        width: 160,
        align: "right",
        sortable: false,
        renderCell: (row) => (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              fill="currentColor"
              className="bi bi-bag"
              viewBox="0 0 16 16"
              style={{ color: "#757575c9", fontWeight: "bold" }}
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
            <svg
              width={22}
              className="ml-2"
              id="heart"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: "#757575c9", fontWeight: "bold" }}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        ),
      },
    ];

    const rows = [
      createData(1, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
      createData(2, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
      createData(3, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
      createData(4, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
      createData(5, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
      createData(6, "****.net", "AU", 3.5, 65, 89, 89565, "$2323"),
      createData(7, "****.net", "DE", 3.5, 65, 89, 89565, "$2323"),
      createData(8, "****.net", "IE", 3.5, 65, 89, 89565, "$2323"),
      createData(9, "****.net", "MX", 3.5, 65, 89, 89565, "$2323"),
      createData(10, "****.net", "JP", 3.5, 65, 89, 89565, "$2323"),
      createData(11, "****.net", "FR", 3.5, 65, 89, 89565, "$2323"),
      createData(12, "****.net", "GB", 3.5, 65, 89, 89565, "$2323"),
      createData(13, "****.net", "RU", 3.5, 65, 89, 89565, "$2323"),
      createData(14, "****.net", "NG", 3.5, 65, 89, 89565, "$2323"),
      createData(15, "****.net", "BR", 3.5, 65, 89, 89565, "$2323"),
    ];

    function createData(id, name, language, rating, dr, da, traffic, price) {
      return { id, name, language, rating, dr, da, traffic, price };
    }
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
                <div className="AdminOrdersData">
                  <Paper>
                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
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
                            ))}
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
                                  key={row.code}
                                  selected={isSelected}
                                  onClick={(event) =>
                                    this.handleRowClick(event, index)
                                  }
                                  style={
                                    isSelected
                                      ? {
                                          backgroundColor:
                                            "rgba(30, 41, 59, 0.12)",
                                        }
                                      : {}
                                  }
                                >
                                  {columns.map((column) => (
                                    <TableCell
                                      className="fontBold600"
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.renderCell
                                        ? column.renderCell(row)
                                        : column.format &&
                                          typeof row[column.id] === "number"
                                        ? column.format(row[column.id])
                                        : row[column.id]}
                                    </TableCell>
                                  ))}
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
    );
  }
}
export default withRouter(AdminOrders);
