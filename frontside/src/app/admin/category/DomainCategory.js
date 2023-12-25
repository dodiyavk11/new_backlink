import React, { Component } from "react";
import "../../../assets/custom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiServices from "../../services/api.service";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";

export class DomainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      viewCategory: null,
      editCategory: null,
      showModal: false,
      addCategory: {
        name: "",
        description: "",
      },
    };
  }

  getListOfCategory() {
    ApiServices.getDomainCategoryList().then((res) => {
      if (res.status) {
        this.setState({
          categoryList: res.data.data,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  }

  viewCategory = (category) => {
    this.setState({
      viewCategory: category,
    });
  };

  handleDeleteClick(id) {
    ApiServices.domainCategoryDelete(id).then((res) => {
      if (res.status) {
        this.getListOfCategory();
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    });
  }

  handleEditClick = (category) => {
    this.setState({
      editCategory: category,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      editCategory: {
        ...this.state.editCategory,
        [name]: value,
      },
    });
  };

  handleAddChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      addCategory: {
        ...prevState.addCategory,
        [name]: value,
      },
    }));
  };

  addCategoryeModal = () => this.setState({ showModal: true });
  closeModal = () => {
    this.handletoClearState();
  };

  handletoClearState() {
    this.setState({
      showModal: false,
      editCategory: null,
      viewCategory: null,
      addCategory: {
        name: "",
        description: "",
      },
    });
  }

  handleUpdateCategory() {
    const id = this.state.editCategory.id;
    const formData = this.state.editCategory;
    ApiServices.updateDomainCategory(formData, id).then((res) => {
      if (res.status) {
        this.setState({
          editCategory: null,
        });
        this.getListOfCategory();
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    });
  }

  addCategory() {
    const formData = this.state.addCategory;
    ApiServices.addDomainCategory(formData).then((res) => {
      if (res.status) {
        this.getListOfCategory();
        this.closeModal();
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    });
  }

  componentDidMount() {
    this.getListOfCategory();
  }

  render() {
    const { categoryList, viewCategory, editCategory, addCategory } =
      this.state;
    const { t } = this.props;
    return (
      <div className="bundleLinkPage adminPlan">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Domain category</Trans>
            </h3>
          </div>
          <div className="ExportBtn">
            <button
              className="btn btn-rounded d-inline-flex btn-sm"
              onClick={this.addCategoryeModal}
            >
              <i className="mdi mdi-plus-circle mr-2"></i>
              <Trans>Add new</Trans>
            </button>
          </div>
        </div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                {categoryList.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover orderListTable">
                      <thead>
                        <tr>
                          <th>
                            <Trans>ID</Trans>
                          </th>
                          <th>
                            <Trans>Name</Trans>
                          </th>
                          <th>
                            <Trans>Description</Trans>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList.map((category) => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                              <i
                                className="mdi mdi-pencil mr-2"
                                style={{
                                  color: "#655656",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  fontSize: "25px",
                                }}
                                onClick={() => this.handleEditClick(category)}
                              ></i>
                              <i
                                className="mdi mdi-eye mr-2"
                                onClick={() => this.viewCategory(category)}
                                style={{
                                  color: "#655656",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  fontSize: "25px",
                                }}
                              ></i>
                              <i
                                className="mdi mdi-delete mr-2"
                                onClick={() =>
                                  this.handleDeleteClick(category.id)
                                }
                                style={{
                                  color: "#655656",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  fontSize: "25px",
                                }}
                              ></i>
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
                      <h4>
                        <Trans>No Domain category found...</Trans>
                      </h4>
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* View Category modal */}
        <Modal
          show={!!viewCategory}
          onHide={() => this.closeModal()}
          className="addPublisherDomainModal"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>View category</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            {viewCategory && (
              <div>
                <Form.Group>
                  <label className="font-weight-bold">
                    <Trans>Name</Trans>
                  </label>
                  <h5>{viewCategory.name}</h5>
                </Form.Group>
                <hr />
                <Form.Group>
                  <label className="font-weight-bold">
                    <Trans>Description</Trans>
                  </label>
                  <h5>{viewCategory.description}</h5>
                </Form.Group>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-block btn-rounded btn-lg"
              onClick={() => this.closeModal()}
            >
              <Trans>Close</Trans>
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Update Category modal */}
        <Modal
          show={!!editCategory}
          onHide={() => this.closeModal()}
          className="addPublisherDomainModal"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Edit category</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            {editCategory && (
              <div>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="name">
                    <Trans>Name</Trans>
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={t("Category name")}
                    name="name"
                    id="title"
                    aria-label="name"
                    value={editCategory.name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="desc">
                    <Trans>Description</Trans>
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={t("Description")}
                    name="description"
                    id="desc"
                    aria-label="title"
                    value={editCategory.description}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-block btn-rounded btn-lg"
              onClick={() => this.handleUpdateCategory()}
            >
              <Trans>Update</Trans>
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Category modal */}
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
                <Trans>Add Category</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="name">
                  <Trans>Name</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={t("Category name")}
                  name="name"
                  id="name"
                  aria-label="name"
                  value={addCategory.name}
                  onChange={this.handleAddChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="desc">
                  <Trans>Description</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={t("Description")}
                  name="description"
                  id="desc"
                  aria-label="desc"
                  value={addCategory.description}
                  onChange={this.handleAddChange}
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-block btn-rounded btn-lg"
              onClick={() => this.addCategory()}
            >
              <Trans>Add</Trans>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// export default DomainCategory;
export default withTranslation()(DomainCategory);
