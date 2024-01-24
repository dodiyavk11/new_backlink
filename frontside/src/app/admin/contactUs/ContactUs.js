import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";
import "../../../assets/custom.css";
import TimeAgo from "timeago-react";
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
export class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      orderBy: "id",
      order: "desc",
      selectedRow: null,
      rows: [],
      viewContactUs: null,
      error: "",
      showModal: false,
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

  getContactUsData = () => {
    ApiServices.adminContactUsData()
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (res.data.data) {
            this.setState({ rows: res.data.data });
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
  };
  handleSolve = (data) => {
    ApiServices.markAsSolved(data.id)
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.closeModal();
          this.getContactUsData();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
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
  };

  viewContactUs = (data) => {
    this.setState({
      viewContactUs: data,
    });
    this.viewModal();
  };

  viewModal = () => this.setState({ showModal: true });
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  componentDidMount() {
    this.getContactUsData();
  }
  // Datatable End
  render() {
    const { t } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy,
      order,
      rows,
      error,
      selectedUser,
      viewContactUs,
    } = this.state;
    const columns = [
      {
        id: "id",
        label: <Trans>ID</Trans>,
        height: 70,
        width: 300,
        align: "left",
        sortable: true,
      },
      {
        id: "name",
        label: <Trans>Name</Trans>,
        height: 70,
        width: 300,
        align: "left",
        sortable: false,
      },
      {
        id: "email",
        label: <Trans>Email</Trans>,
        width: 200,
        sortable: false,
        align: "left",
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
        id: "aciton",
        label: <Trans>Action</Trans>,
        align: "left",
        sortable: false,
        renderCell: (row) => (
          <div>
            {row.status === 0 ? (
              <span onClick={() => this.handleSolve(row)}>
                <i
                  className="mdi mdi-close-circle-outline mr-2"
                  title="Unsolved"
                  style={{
                    color: "#655656",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "25px",
                    color: "red",
                  }}
                ></i>
              </span>
            ) : (
              <span>
                <i
                  className="mdi mdi-check-circle-outline mr-2"
                  title="Solved"
                  style={{
                    color: "#655656",
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "green",
                  }}
                ></i>
              </span>
            )}
            <span onClick={() => this.viewContactUs(row)}>
              <i
                className="mdi mdi-eye mr-2"
                title="SolViewved"
                style={{
                  color: "#655656",
                  fontWeight: "bold",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              ></i>
            </span>
          </div>
        ),
      },
    ];

    return (
      <>
        <div className="adminUserList">
          <div className="d-flex justify-content-between">
            <div className="page-header">
              <h3 className="fontBold latterSpacing">
                <Trans>Contact us</Trans>
              </h3>
            </div>
          </div>
          <ToastContainer />
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
                                    key={index}
                                    selected={isSelected}
                                    onClick={(event) =>
                                      this.handleRowClick(event, index)
                                    }
                                    style={{
                                      ...(isSelected
                                        ? {
                                            backgroundColor:
                                              "rgba(30, 41, 59, 0.12)",
                                          }
                                        : {}),
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
          <Modal
            show={this.state.showModal}
            onHide={() => this.closeModal()}
            className="addPublisherDomainModal"
            centered
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <div>
                <span className="modal-title h3 font-weight-bold">
                  <Trans>Contact us</Trans>
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              {viewContactUs && (
                <div>
                  <Form.Group>
                    <label className="font-weight-bold" htmlFor="name">
                      <Trans>Name</Trans>
                    </label>
                    <h5>{viewContactUs.name}</h5>
                  </Form.Group>
                  <Form.Group>
                    <label className="font-weight-bold" htmlFor="name">
                      <Trans>Email</Trans>
                    </label>
                    <h5>{viewContactUs.email}</h5>
                  </Form.Group>
                  <Form.Group>
                    <label className="font-weight-bold" htmlFor="name">
                      <Trans>Phone</Trans>
                    </label>
                    <h5>{viewContactUs.mobile}</h5>
                  </Form.Group>
                  <Form.Group>
                    <label className="font-weight-bold" htmlFor="name">
                      <Trans>Messages</Trans>
                    </label>
                    <h5>{viewContactUs.comment}</h5>
                  </Form.Group>
                  <Form.Group>
                    <label className="font-weight-bold" htmlFor="name">
                      <Trans>Action</Trans>
                    </label>
                    {viewContactUs.status === 0 ? (
                      <>
                        <h4>This issue is still not solved.</h4>
                        <Button
                          variant="info"
                          onClick={() => this.handleSolve(viewContactUs)}
                        >
                          <Trans>Mark as resolved</Trans>
                        </Button>
                      </>
                    ) : (
                      <h4>
                        <span className="text-success">
                          <Trans>This issue has been resolved.</Trans>
                        </span>
                      </h4>
                    )}
                  </Form.Group>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}
export default withTranslation()(withRouter(ContactUs));
