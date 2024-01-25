import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TimeAgo from "timeago-react";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";
import { withTranslation } from "react-i18next";

import {
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

export class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 10,
      orderBy: "id",
      order: "desc",
      selectedRow: null,
      isLoading: false,
    };
  }

  // Datatable start
  handleRowClick = (event, index) => {
    // if (event.target.tagName === "TD") {
    this.setState({ selectedRow: index });
    // }
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

  getUserTransaction() {
    ApiServices.userPaymetnTransaction().then(
      (res) => {
        if (res.data.status) {
          this.setState({
            rows: res.data.data,
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

  handleDownloadInvoice = (id, order_id) => {
    this.setState({ isLoading: true });
    const data = {
      id,
      order_id,
    };
    ApiServices.generateInvoicePdf(data).then(
      (res) => {
        if (res.status) {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = `${process.env.REACT_APP_BASE_URL}${res.data.filepath}`;
            link.download = `invoice_${id}.pdf`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 500);
        } else {
          toast.error(<Trans>Something went to wrong.</Trans>, {
            position: "top-center",
            autoClose: 2000,
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
  };

  componentDidMount() {
    this.getUserTransaction();
  }
  render() {
    const { t } = this.props;
    const { rows, page, rowsPerPage, orderBy, order } = this.state;
    const columns = [
      {
        id: "id",
        label: "ID",
        height: 100,
        width: 50,
        sortable: true,
        renderCell: (row) => <span>{row.id}</span>,
      },
      {
        id: "amount",
        label: <Trans>Amount</Trans>,
        sortable: true,
        renderCell: (row) => <span>${row.amount}</span>,
      },
      {
        id: "type",
        label: <Trans>Type</Trans>,
        width: 130,
        align: "right",
        sortable: false,
        renderCell: (row) => <span>{row.transaction_type}</span>,
      },
      {
        id: "description",
        label: <Trans>Description</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => <span>{row.description}</span>,
      },
      {
        id: "status",
        label: <Trans>Status</Trans>,
        width: 90,
        sortable: false,
        renderCell: (row) => <span>{row.status}</span>,
      },
      {
        id: "invoice",
        label: <Trans>Inovice</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) =>
          row.status !== "incomplete" ? (
            <span
              style={{ cursor: "pointer", fontSize: "23px" }}
              onClick={() => this.handleDownloadInvoice(row.id, row.order_id)}
            >
              <i
                className="mdi mdi-receipt"
                style={{ color: "#ea6918" }}
                title={t("Invoice download")}
              ></i>
            </span>
          ) : (
            <span>
              <i className="mdi mdi-alert-circle"></i>
            </span>
          ),
      },
      {
        id: "created_at",
        label: <Trans>Created at</Trans>,
        width: 130,
        sortable: false,
        renderCell: (row) => (
          <span>
            {" "}
            <TimeAgo datetime={row.created_at} locale="en" />
          </span>
        ),
      },
    ];

    return (
      <>
        <div className="ordersListPage adminOrdersList">
          <div className="d-flex justify-content-between">
            <div className="page-header">
              <h3 className="fontBold latterSpacing">
                <Trans>Transactions</Trans>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 grid-margin">              
              <div className="card mb-4 bRadius">
                <div className="card-body projectsCard">
                  <ToastContainer />
                  <div className="tableData">
                    <Paper style={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer style={{ maxHeight: "50%" }}>
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
                                      this.handleRowClick(event, index)
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
                        rowsPerPageOptions={[5, 10, 15, 50]}
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
// export default withRouter(Payments);
export default withTranslation()(Payments);
