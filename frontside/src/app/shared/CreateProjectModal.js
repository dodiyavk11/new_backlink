import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Trans,withTranslation } from "react-i18next";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/custom.css";

class CreateProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain_name: "",
      budget: "",
      category_id: "",
      domainCategoryList: [],
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getDomainCategoryList = () => {
    ApiServices.getDomainCategoryList()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({ domainCategoryList: res.data.data });
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
  componentDidMount() {
    this.getDomainCategoryList();
  }

  render() {
    const { budget, domain_name, category_id } = this.state;
    const { t } =  this.props;
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
              <Trans>Create Project</Trans>
            </span>
            <p className="mb-8">
              <Trans>
                Create a new project, organize your bookings and always keep an
                eye on your budget.
              </Trans>
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <label>
                <Trans>Domain</Trans>
              </label>
              <p className="customText">
                <Trans>For which domain is the project?</Trans>
              </p>
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
              <label className="font-weight-bold" htmlFor="category_id">
                <Trans>Category</Trans>
              </label>
              <select
                className="form-control"
                id="category_id"
                name="category_id"
                value={category_id}
                onChange={this.handleInputChange}
              >
                <option value="">{t("Select category")}</option>
                {this.state.domainCategoryList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <label>
                <Trans>Budget</Trans>
              </label>
              <p className="customText">
                <Trans>What is the budget for this project?</Trans>
              </p>
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
            <Button
              className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
              onClick={() => this.props.onSubmit(this.state)}
            >
              <Trans>Create project</Trans>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

// export default CreateProjectModal;
export default withTranslation()(CreateProjectModal);