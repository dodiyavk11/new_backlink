import React, { Component } from "react";
import { Trans } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";

class HelpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      showModal: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  showProjectModal = () => this.setState({ showModal: true });
  closeProjectModal = () => this.setState({ showModal: false });
  handleFormSubmit = () => {
    console.log(this.state);
  };
  render() {
    const { name, email, message, showModal } = this.state;
    return (
      <div className="helpForm">
        <div className="floating-button">
          <button className="btn" onClick={() => this.showProjectModal()} title="Any problem?">
            <i className="mdi mdi-comment-question-outline p-0"></i>
          </button>
        </div>
        <Modal
          className="createProjectModal"
          centered
          backdrop="static"
          keyboard={false}
          show={showModal}
          onHide={this.closeProjectModal}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Any problem? Contact us</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <label>
                  <Trans>Name</Trans>
                </label>
                <p className="customText"></p>
                <Form.Control
                  type="text"
                  className="form-control-sm"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <label>
                  <Trans>Email</Trans>
                </label>
                <Form.Control
                  type="email"
                  className="form-control-sm"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <label>
                  <Trans>Message</Trans>
                </label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="form-control-sm"
                  placeholder="Message"
                  name="message"
                  value={message}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Button
                className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                onClick={() => this.handleFormSubmit()}
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
