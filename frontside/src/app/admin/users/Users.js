import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";
import "../../../assets/custom.css";
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
export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      orderBy: "id",
      order: "desc",
      selectedRow: null,
      orderData: [],
      rows: [],
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      error: "",
      type: "",
      selectedUser: null,
      userId: null,
      showModal: false,
      searchValue: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleEditClick = (id) => {
    const selectedUser = this.state.rows.find((user) => user.id === id);
    this.setState({
      selectedUser,
      showModal: true,
      userId: selectedUser.id,
      email: selectedUser.email,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      phone: selectedUser.phone,
      type: selectedUser.isAdmin,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userType = this.state.selectedUser ? 1 : 0;
    this.postRegister(userType);
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  handletoClearState() {
    this.setState({
      selectedUser: null,
      showModal: false,
      userId: null,
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      type: "",
    });
  }

  showUserCreateModal = () => this.setState({ showModal: true });
  closeUserCreateModal = () => {
    this.handletoClearState();
  };

  postRegister(isEdit) {
    const { email, password, firstName, lastName, phone, type, selectedUser } =
      this.state;
    let formData = new FormData();
    if (isEdit) {
      if (!firstName || !lastName || !phone) {
        this.setState({ error: <Trans>Please fill required fields.</Trans> });
        return;
      }
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("id", selectedUser.id);
      formData.append("isAdmin", type);
      formData.append("email", email);
    } else {
      if (!password || !email || !firstName || !lastName || !phone || !type) {
        this.setState({ error: <Trans>Please fill required fields.</Trans> });
        return;
      }
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("type", type);
    }
    ApiServices.createUpdateUser(formData, isEdit)
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
          this.closeUserCreateModal();
          this.getUserList();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  }
  handleDeleteClick = (id, isDeleted) => {
    ApiServices.blockUser(id, isDeleted ? 0 : 1)
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
          this.getUserList();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };
  getUserList = (filter = null) => {
    ApiServices.adminUserList(filter)
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
  handleLoginClick = (userId) => {
    AuthService.loginAsSuperAdmin(userId).then(
      () => {
        setTimeout(() => {
          this.props.handleLoginSuccess(1);
        }, 100);
        // window.location.reload();
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
    this.getUserList();
  }

  handleOnSearch = (e) => {
    this.setState({ searchValue: e.target.value }, this.updateFilterData);
  };

  updateFilterData = () => {
    const filter = { q: this.state.searchValue };
    this.getUserList(filter);
  };

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
      searchValue,
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
        renderCell: (row) => <span>{row.firstName + " " + row.lastName}</span>,
      },
      {
        id: "email",
        label: <Trans>Email</Trans>,
        width: 200,
        sortable: false,
        align: "left",
      },
      {
        id: "phone",
        label: <Trans>Phone</Trans>,
        width: 200,
        align: "left",
      },
      {
        id: "city",
        label: <Trans>City</Trans>,
        align: "left",
        width: 200,
        sortable: false,
      },
      {
        id: "postal_code",
        label: <Trans>Postal code</Trans>,
        align: "left",
        width: 200,
      },
      {
        id: "isAdmin",
        label: <Trans>Type</Trans>,
        align: "left",
        sortable: true,
        width: 200,
        renderCell: (row) => (
          <div className={`text-dark`}>
            {row.isAdmin === 1
              ? "Admin"
              : row.isAdmin === 2
              ? "Publisher"
              : "User"}
          </div>
        ),
      },
      {
        id: "login",
        label: <Trans>Login</Trans>,
        align: "left",
        sortable: false,
        renderCell: (row) => (
          <button
            className="btn btn-info btn-sm"
            onClick={() => this.handleLoginClick(row.id)}
          >
            <Trans>Login</Trans>
          </button>
        ),
      },
      {
        id: "aciton",
        label: <Trans>Action</Trans>,
        align: "left",
        sortable: false,
        renderCell: (row) => (
          <div>
            <i
              className="mdi mdi-pencil mr-2"
              style={{
                color: "#655656",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "25px",
              }}
              onClick={() => this.handleEditClick(row.id)}
            ></i>
            <i
              className="mdi mdi-delete"
              onClick={() => this.handleDeleteClick(row.id, row.isDeleted)}
              style={{
                color: row.isDeleted === 1 ? "red" : "#655656",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "25px",
              }}
            ></i>
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
                <Trans>All users</Trans>
              </h3>
            </div>
            <div className="ExportBtn">
              <button
                className="btn btn-rounded d-inline-flex btn-sm"
                onClick={this.showUserCreateModal}
              >
                <i className="mdi mdi-account-plus mr-2"></i>
                <Trans>Create new user</Trans>
              </button>
            </div>
          </div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 bRadius">
                <div className="card-body projectsCard">
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
                            placeholder={t("Search")}
                            className="form-control border-left-0 customSearch"
                            onChange={this.handleOnSearch}
                            value={searchValue}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <hr style={{ marginBottom: "0px" }} />
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
            className="createUserModal"
            centered
            backdrop="static"
            keyboard={false}
            show={this.state.showModal}
            onHide={this.closeUserCreateModal}
          >
            <Modal.Header closeButton>
              <div>
                <span className="modal-title h3 font-weight-bold">
                  {this.state.selectedUser ? (
                    <Trans>Edit user</Trans>
                  ) : (
                    <Trans>Create new user</Trans>
                  )}
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              <form className="pt-3" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    required
                    className="form-control form-control-lg"
                    name="firstName"
                    id="exampleInputfname"
                    placeholder={t("First Name *")}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleInputChange}
                    className="form-control form-control-lg"
                    type="text"
                    required
                    name="lastName"
                    placeholder={t("Last Name *")}
                    value={this.state.lastName}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleInputChange}
                    type="email"
                    required
                    name="email"
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    placeholder={t("Email *")}
                    // disabled={selectedUser}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    required
                    name="phone"
                    className="form-control form-control-lg"
                    placeholder={t("Phone *")}
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleInputChange}
                    name="password"
                    type="password"
                    minLength="8"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder={t("Password *")}
                    disabled={selectedUser}
                  />
                  {this.state.password.length > 0 &&
                    this.state.password.length < 8 && (
                      <span style={{ color: "red" }}>
                        <Trans>
                          Password must be at least 8 characters long
                        </Trans>
                      </span>
                    )}
                </div>
                <div className="form-group">
                  <select
                    name="type"
                    required
                    className="form-control form-control-lg"
                    style={{ color: "#222" }}
                    value={this.state.type}
                    // disabled={selectedUser}
                    onChange={this.handleInputChange}
                  >
                    <option value="">{t("select User Type")}</option>
                    <option value="1">Admin</option>
                    <option value="2">Publisher</option>
                    <option value="0">User</option>
                  </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                  >
                    {this.state.selectedUser ? (
                      <Trans>Update</Trans>
                    ) : (
                      <Trans>Create</Trans>
                    )}
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}
// export default withRouter(Users);
export default withTranslation()(withRouter(Users));
