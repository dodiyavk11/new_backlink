import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../../assets/custom.css";
class CreateProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        domain_name:'',
        budget:'',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { budget, domain_name } = this.state;
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
                <span className="modal-title h3 font-weight-bold">Create Project</span>
                <p className="mb-8">Create a new project, organize your bookings and always keep an eye on your budget.</p>
            </div>          
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <label>Domain</label>
              <p className="customText">For which domain is the project?</p>
              <Form.Control
                type="text"
                className="form-control-sm"
                placeholder="Fairlinked.com"
                name="domain_name"
                aria-label="domain_name"
                value={domain_name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <label>Budget</label>
              <p className="customText">What is the budget for this project?</p>
              <Form.Control
                type="number"
                className="form-control-sm"
                placeholder="499.00"
                name="budget"
                aria-label="budget"
                value={budget}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn" onClick={() => this.props.onSubmit(this.state)}>
              Create project
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateProjectModal;
