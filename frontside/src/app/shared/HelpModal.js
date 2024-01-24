import React, { Component } from "react";
import { Trans } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ApiServices from "../services/api.service";

class HelpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      comment: "",
      showModal: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  showContactModal = () => this.setState({ showModal: true });
  closeContactModal = () => this.setState({ showModal: false });
  handleFormSubmit = (e) => {
    e.preventDefault();
    ApiServices.userContactUs(this.state).then(
      (res) => {
        if (res.data.status) {
          this.setState({
            name: "",
            email: "",
            mobile: "",
            comment: "",
            showModal: false,
          });
          this.closeContactModal();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      },
      (error) => {
        if (error.response && error.response.data) {
          const responseData = error.response.data;

          if (responseData.status === false && responseData.error) {
            const validationError = responseData.error;
            if (Array.isArray(validationError)) {
              const firstError = validationError[0];
              const errorMessage = firstError.message;
              toast.error(errorMessage, {
                position: "top-center",
                autoClose: 2000,
              });
            } else if (typeof validationError === "string") {
              toast.error(validationError, {
                position: "top-center",
                autoClose: 2000,
              });
            }
          } else {
            const resMessage =
              responseData.message ||
              responseData.error ||
              error.message ||
              error.toString();

            toast.error(resMessage, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } else {
          const resMessage = error.message || error.toString();
          toast.error(resMessage, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    );
  };
  render() {
    const { name, email, mobile, comment, showModal } = this.state;
    const isAdmin = localStorage.getItem("isAdmin");
    const displayStyle = isAdmin && isAdmin === "1" ? { display: "none" } : {};
    return (
      <div className="helpForm" style={displayStyle}>
        <ToastContainer />
        <div className="floating-button">
          <button
            className="btn"
            onClick={() => this.showContactModal()}
            title="Any problem?"
          >
            <i className="mdi mdi-comment-question-outline p-0"></i>
          </button>
        </div>
        <Modal
          className="createProjectModal"
          centered
          backdrop="static"
          keyboard={false}
          show={showModal}
          onHide={this.closeContactModal}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Any problem? Contact us</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group>
                <label>
                  <Trans>Name</Trans>
                </label>
                <p className="customText"></p>
                <Form.Control
                  required
                  type="text"
                  className="form-control-sm"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <label>
                  <Trans>Email address</Trans>
                </label>
                <Form.Control
                  required
                  type="email"
                  className="form-control-sm"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <label>
                  <Trans>Phone Number</Trans>
                </label>
                <Form.Control
                  required
                  type="text"
                  className="form-control-sm"
                  name="mobile"
                  value={mobile}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <label>
                  <Trans>Messages</Trans>
                </label>
                <Form.Control
                  as="textarea"
                  required
                  rows={3}
                  className="form-control-sm"
                  name="comment"
                  value={comment}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Button
                className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                type="submit"
              >
                <Trans>Send</Trans>
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default HelpModal;
