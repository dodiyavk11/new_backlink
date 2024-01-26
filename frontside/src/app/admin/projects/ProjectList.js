import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TimeAgo from "timeago-react";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";
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
import CurrencyFormatter from "../../shared/CurrencyFormatter";

export class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable: false,
      page: 0,
      rowsPerPage: 10,
      orderBy: "id",
      order: "desc",
      selectedRow: null,
    };
  }

  gotoViewContentLink = (hash_id, event, index) => {
    this.props.history.push(`/admin/project/${hash_id}`);
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

  handleOpenContentDomain = (url) => {
    window.open("https://" + url, "_blank");
  };

  render() {
    const { page, rowsPerPage, orderBy, order, isDisable } = this.state;
    const rows = this.props.activeProjects;
    const columns = [
      {
        id: "id",
        label: <Trans>ID</Trans>,
        height: 70,
        width: 345,
        sortable: true,
      },
      {
        id: "domain_name",
        label: <Trans>Project</Trans>,
        height: 70,
        width: 345,
        sortable: false,
      },
      {
        id: "created_at",
        label: <Trans>Created</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => (
          <TimeAgo
            datetime={row.created_at}
            locale="en"
            style={{ fontSize: "10px" }}
          />
        ),
      },
      {
        id: "budget",
        label: <Trans>Budget</Trans>,
        width: 130,
        sortable: true,
        renderCell: (row) => <span>{CurrencyFormatter.formatCurrency(row.budget)}</span>,
      },
      {
        id: "user",
        label: <Trans>User</Trans>,
        width: 130,
        align: "right",
        sortable: false,
        format: (value) => value.toLocaleString("en-US"),
        renderCell: (row) => (
          <span>
            {row.user.firstName} {row.user.lastName}
          </span>
        ),
      },
      {
        id: "email",
        label: <Trans>Email</Trans>,
        width: 130,
        sortable: false,
        sortable: false,
        renderCell: (row) => <span>{row.user.email}</span>,
      },
      // {
      //   id: "dr",
      //   label: "DR",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.domain_rating}</span>,
      // },
      // {
      //   id: "da",
      //   label: "DA",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.authority}</span>,
      // },
      // {
      //   id: "svi",
      //   label: "SI",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.visibility_index}</span>,
      // },
      // {
      //   id: "tf",
      //   label: "TF",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.trust_flow}</span>,
      // },
      // {
      //   id: "rd",
      //   label: "RD",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.referring}</span>,
      // },
      // {
      //   id: "traffic",
      //   label: "TRAFFIC",
      //   width: 90,
      //   align: "right",
      //   renderCell: (row) => <span>{row.contentData.traffic}</span>,
      // },
      // {
      //   id: "price",
      //   label: "PRICE",
      //   width: 160,
      //   align: "right",
      //   renderCell: (row) => (
      //     <span className="fontBold700 textColorCls">${row.price}</span>
      //   ),
      // },
    ];

    return (
      <>
        <div className="ContentLinkHomePage">
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 bRadius">
                <div className="card-body p-2">
                  <div
                    className={`tableData ${isDisable ? "disabled-div" : ""}`}
                  >
                    <Paper style={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer style={{ maxHeight: 440 }}>
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
                                    key={row.id}
                                    selected={isSelected}
                                    onClick={(event) =>
                                      this.gotoViewContentLink(
                                        row.hash_id,
                                        event,
                                        index
                                      )
                                    }
                                    style={{
                                      cursor: "pointer",
                                      height: "55px",
                                    }}
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
export default withRouter(ProjectList);
