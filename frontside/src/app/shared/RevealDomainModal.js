import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/custom.css";

class RevealDomainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain_id: "",
      message: "Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { message } = this.state;
    const { t } = this.props;
    return (
      <Modal
        className="createProjectModal"
        centered
        backdrop="static"
        keyboard={false}
        show={this.props.showModal}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <div>
            <span className="modal-title h3 font-weight-bold">
              <Trans>Reveal Domain Request</Trans>
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <label>
                <Trans>Messages</Trans>
              </label>
              <Form.Control
                as="textarea"
                rows={3}
                className="form-control-sm"
                placeholder="Fairlinked.com"
                name="message"
                aria-label="message"
                value={message}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button
              className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
              onClick={() => this.props.onSubmit(this.state)}
            >
              <Trans>Send</Trans>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withTranslation()(RevealDomainModal);
