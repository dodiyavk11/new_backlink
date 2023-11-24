import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { CPopover, CButton } from "@coreui/react";
import "../../../assets/custom.css";
import {
  Typography,
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
export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      orderBy: "name",
      order: "asc",
      selectedRow: null,
      orderData: [],
    };
  }

  // Datatable start
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
  handleDeleteClick = (id) => {
    console.log(`Delete clicked for row with ID: ${id}`);
  };
  handleEditClick = (id) => {
    console.log(`Edit clicked for row with ID: ${id}`);
  };
  // Datatable End
  render() {
    const { page, rowsPerPage, orderBy, order } = this.state;
    const columns = [
      {
        id: "name",
        label: "Name",
        height: 70,
        width: 300,
        align: "left",
        sortable: false,
        renderCell: (row) => (
          <div style={{ display: "flex" }}>
            <button className="customBtn2 mr-2">
              <svg
                width={20}
                id="user"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "#655656", fontWeight: "bold" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        ),
      },
      {
        id: "email",
        label: "Email",
        width: 200,
        sortable: false,
        align: "left",
      },
      {
        id: "links",
        label: "Links",
        width: 200,
        align: "left",
      },
      {
        id: "orders",
        label: "Orders",
        align: "left",
        width: 200,
      },
      {
        id: "projects",
        label: "Projects",
        align: "left",
        width: 200,
      },
      {
        id: "aciton",
        label: "",
        align: "left",
        sortable: false,
        renderCell: (row) => (
          <div>
            <svg
              onClick={() => this.handleEditClick(row.id)}
              width={20}
              id="pencil"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mr-2"
              style={{
                color: "#655656",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <svg
              onClick={() => this.handleDeleteClick(row.id)}
              width={20}
              id="trash"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                color: "#655656",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        ),
      },
    ];

    const rows = [
      createData(
        1,
        "First Name Last Name",
        "abc@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        2,
        "First Name Last Name",
        "abc@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        3,
        "First Name Last Name",
        "abc@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        4,
        "First Name Last Name",
        "abc@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        5,
        "First Name Last Name",
        "abc@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        6,
        "First Name Last Name",
        "example@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        7,
        "First Name Last Name",
        "abc@demo.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        8,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        9,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        10,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        11,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        12,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        13,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        14,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
      createData(
        15,
        "First Name Last Name",
        "test@mail.com",
        "LINKS.COM",
        65,
        89
      ),
    ];

    function createData(id, name, email, links, orders, projects) {
      return { id, name, email, links, orders, projects };
    }
    return (
      <>
        <div className="ContentLinkHomePage">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">All Users</h3>
          </div>
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 bRadius">
                <div className="card-body projectsCard">
                  <div className="tableDataUsers">
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
      </>
    );
  }
}
export default withRouter(Users);
