import React, { Component } from "react";
import "../../../assets/custom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/auth.service";
import ApiServices from "../../services/api.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";

export class EmailTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTemplate: [],
      viewTemplate: null,
      editTemplate: null,
      showModal: false,
      addTemplate: {
        email_title: "",
        email_type: "",
        email_content: "",
        header: "",
        file: null,
        isDefault: 0,
      },
    };
  }

  getListOfEmailTemplate() {
    ApiServices.getEmailTemplate().then((res) => {
      if (res.status) {
        this.setState({
          emailTemplate: res.data.data,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  }

  viewTemplate = (template) => {
    this.setState({
      viewTemplate: template,
    });
  };

  handleDeleteClick(id) {
    ApiServices.emailTemplateDelete(id).then((res) => {
      if (res.status) {
        this.getListOfEmailTemplate();
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

  handleEditClick = (template) => {
    this.setState({
      editTemplate: template,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      editTemplate: {
        ...this.state.editTemplate,
        [name]: value,
      },
    });
  };

  handleAddChange = (event) => {
    const { name, value } = event.target;
    const formattedValue =
      name === "email_type" ? value.replace(/\s+/g, "_") : value;
    this.setState((prevState) => ({
      addTemplate: {
        ...prevState.addTemplate,
        [name]: formattedValue,
      },
    }));
  };

  handleAddEditorChange = (value, name) => {
    this.setState((prevState) => ({
      addTemplate: {
        ...prevState.addTemplate,
        email_content: value,
      },
    }));
  };

  handleEditorChange = (value, name) => {
    if (this.state.editTemplate) {
      this.setState((prevState) => ({
        editTemplate: {
          ...prevState.editTemplate,
          [name]: value,
        },
      }));
    }
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      editTemplate: {
        ...this.state.editTemplate,
        file: file,
      },
    });
  };

  addTemplateModal = () => this.setState({ showModal: true });
  closeUserCreateModal = () => {
    this.handletoClearState();
  };

  handletoClearState() {
    this.setState({
      showModal: false,
      addTemplate: {
        email_title: "",
        email_type: "",
        email_content: "",
        header: "",
        file: null,
      },
    });
  }

  handleUpdateTemplate() {
    const id = this.state.editTemplate.id;
    const formData = this.state.editTemplate;
    ApiServices.updateEmailTemplate(formData, id).then((res) => {
      if (res.status) {
        this.setState({
          editTemplate: null,
        });
        this.getListOfEmailTemplate();
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

  addEmailTemplate() {
    const formData = this.state.addTemplate;
    ApiServices.addEmailTemplate(formData).then((res) => {
      if (res.status) {
        this.getListOfEmailTemplate();
        this.closeUserCreateModal();
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

  closeModal() {
    this.setState({
      viewTemplate: null,
      editTemplate: null,
    });
  }
  closeAddModal = () => {
    this.handletoClearState();
  };

  componentDidMount() {
    this.getListOfEmailTemplate();
  }

  render() {
    const { emailTemplate, viewTemplate, editTemplate, addTemplate } =
      this.state;
    const { t } = this.props;
    return (
      <div className="bundleLinkPage adminPlan">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Email template</Trans>
            </h3>
          </div>
          <div className="ExportBtn">
            <button
              className="btn btn-rounded d-inline-flex btn-sm"
              onClick={this.addTemplateModal}
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
                {emailTemplate.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover orderListTable">
                      <thead>
                        <tr>
                          <th>
                            <Trans>ID</Trans>
                          </th>
                          <th>
                            <Trans>Title</Trans>
                          </th>
                          <th>
                            <Trans>Type</Trans>
                          </th>
                          <th>
                            <Trans>Header</Trans>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailTemplate.map((template) => (
                          <tr
                            key={template.id}
                            // onClick={() => this.viewTemplate(template)}
                          >
                            <td>{template.id}</td>
                            <td>{template.email_title}</td>
                            <td>{template.email_type}</td>
                            <td>{template.header}</td>
                            <td>
                              <i
                                className="mdi mdi-pencil mr-2"
                                style={{
                                  color: "#655656",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  fontSize: "25px",
                                }}
                                onClick={() => this.handleEditClick(template)}
                              ></i>
                              <i
                                className="mdi mdi-eye mr-2"
                                onClick={() => this.viewTemplate(template)}
                                style={{
                                  color: "#655656",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  fontSize: "25px",
                                }}
                              ></i>
                              {template.isDefault !== 1 && (
                                <i
                                  className="mdi mdi-delete mr-2"
                                  onClick={() =>
                                    this.handleDeleteClick(template.id)
                                  }
                                  style={{
                                    color: "#655656",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    fontSize: "25px",
                                  }}
                                ></i>
                              )}
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
                        <Trans>No Email template found...</Trans>
                      </h4>
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* View Templete modal */}
        <Modal
          show={!!viewTemplate}
          onHide={() => this.closeModal()}
          className="addPublisherDomainModal"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>View Template</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            {viewTemplate && (
              <div>
                <Form.Group>
                  <label className="font-weight-bold">
                    <Trans>Title</Trans>
                  </label>
                  <h5>{viewTemplate.email_title}</h5>
                </Form.Group>
                <hr />
                <Form.Group>
                  <label className="font-weight-bold">
                    <Trans>Type</Trans>
                  </label>
                  <h5>{viewTemplate.email_type}</h5>
                </Form.Group>
                <hr />
                <Form.Group>
                  <label className="font-weight-bold">
                    <Trans>Header (Subject)</Trans>
                  </label>
                  <h5>{viewTemplate.header}</h5>
                </Form.Group>
                <hr />
                <Form.Group>
                  <label className="font-weight-bold">
                    <Trans>Body (Content)</Trans>
                  </label>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: viewTemplate.email_content,
                      }}
                    ></span>
                  </span>
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
        {/* Update Templete modal */}
        <Modal
          show={!!editTemplate}
          onHide={() => this.closeModal()}
          className="addPublisherDomainModal"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Edit Email template</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            {editTemplate && (
              <div>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="title">
                    <Trans>Title</Trans>
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={t("Title")}
                    name="email_title"
                    id="title"
                    aria-label="title"
                    value={editTemplate.email_title}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="type">
                    <Trans>Type</Trans>
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={t("Email Type")}
                    name="type"
                    id="title"
                    disabled
                    aria-label="title"
                    value={editTemplate.email_type}
                  />
                </Form.Group>
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="header">
                    <Trans>Header (Subject)</Trans>
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={t("Header (Subject)")}
                    name="header"
                    id="header"
                    aria-label="header"
                    value={editTemplate.header}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                {editTemplate.email_type === "welcome" && (
                  <>
                    <Form.Group>
                      <label className="font-weight-bold" htmlFor="file">
                        <Trans>File </Trans>(
                        <Trans>for Welcome term and condition pdf</Trans>)
                      </label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="file"
                        name="file"
                        accept=".pdf"
                        onChange={this.handleFileChange}
                      />
                    </Form.Group>
                    <hr />
                  </>
                )}
                <Form.Group>
                  <label className="font-weight-bold" htmlFor="email_content">
                    <Trans>Body (Content)</Trans>
                  </label>
                  <ReactQuill
                    value={editTemplate.email_content}
                    name="email_content"
                    id="email_content"
                    onChange={(value) =>
                      this.handleEditorChange(value, "email_content")
                    }
                  />
                </Form.Group>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-block btn-rounded btn-lg"
              onClick={() => this.handleUpdateTemplate()}
            >
              <Trans>Update</Trans>
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Templete modal */}
        <Modal
          show={this.state.showModal}
          onHide={() => this.closeAddModal()}
          className="addPublisherDomainModal"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Add Email template</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="title">
                  <Trans>Title</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={t("Title e.g New order")}
                  name="email_title"
                  id="title"
                  aria-label="title"
                  value={addTemplate.email_title}
                  onChange={this.handleAddChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="type">
                  <Trans>Type</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={t("Email Type e.g Welcome")}
                  name="email_type"
                  id="title"
                  aria-label="title"
                  value={addTemplate.email_type}
                  onChange={this.handleAddChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="header">
                  <Trans>Header (Subject)</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={t("e.g Welcome to Fairlinked family")}
                  name="header"
                  id="header"
                  aria-label="header"
                  value={addTemplate.header}
                  onChange={this.handleAddChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="email_content">
                  <Trans>Body (Content)</Trans>
                </label>
                <ReactQuill
                  value={addTemplate.email_content}
                  name="email_content"
                  id="email_content"
                  onChange={(value) => this.handleAddEditorChange(value)}
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-block btn-rounded btn-lg"
              onClick={() => this.addEmailTemplate()}
            >
              <Trans>Add</Trans>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// export default EmailTemplate;
export default withTranslation()(EmailTemplate);
