import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/custom.css";
import { Trans } from "react-i18next";

class UpdatePublisherProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain_id: 0,
      domain_name: "",
      category_id: "",
      price: 0,
      anchorText: "As desired",
      deliveryTime: 0,
      attribute: "dofollow",
      sensitiveTopic: "0",
      sensitiveTopicCharge: 0,
      minWordCount: 0,
      textByCustomer: 0,
      textInclude: 1,
      language: "en",
      domainCategoryList: [],
    };
  }

  componentDidMount() {
    this.getDomainCategoryList();
  }

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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  componentDidUpdate(prevProps) {
    if (this.props.showModal && !prevProps.showModal) {
      const { domainData } = this.props;

      this.setState({
        domain_id: domainData.id,
        domain_name: domainData.domain_name,
        category_id: domainData.category_id,
        price: domainData.price,
        anchorText: domainData.anchorText,
        deliveryTime: domainData.deliveryTime,
        attribute: domainData.attribute,
        sensitiveTopic: domainData.sensitiveTopic,
        sensitiveTopicCharge: domainData.sensitiveTopicCharge
          ? domainData.sensitiveTopicCharge
          : "0",
        minWordCount: domainData.minWordCount,
        textByCustomer: domainData.textByCustomer,
        textInclude: domainData.textInclude,
        language: domainData.language,
      });
    }
  }

  handleDomainAddSubmit = () => {
    const {
      domain_name,
      price,
      category_id,
      anchorText,
      deliveryTime,
      attribute,
      sensitiveTopic,
      sensitiveTopicCharge,
      minWordCount,
      textByCustomer,
      textInclude,
      language,
      domain_id,
    } = this.state;

    const updateDomainData = {
      domain_name,
      price,
      category_id,
      anchorText,
      deliveryTime,
      attribute,
      sensitiveTopic,
      sensitiveTopicCharge,
      minWordCount,
      textByCustomer,
      textInclude,
      language,
    };
    ApiServices.publisherDomainUpdate(domain_id, updateDomainData).then(
      (res) => {
        if (res.status) {
          this.props.handleClose();
          this.props.refreshData();
          toast.success(res.data.message, {
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
  render() {
    const {
      domain_name,
      category_id,
      price,
      anchorText,
      deliveryTime,
      attribute,
      sensitiveTopic,
      sensitiveTopicCharge,
      minWordCount,
      textByCustomer,
      textInclude,
      language,
    } = this.state;
    const { domainData } = this.props;
    return (
      <div className="modalDivClass">
        <ToastContainer />
        <Modal
          className="addPublisherDomainModal"
          centered
          backdrop="static"
          keyboard={false}
          show={this.props.showModal}
          onHide={this.props.handleClose}
        >
          <Modal.Header closeButton>
            <div>
              <span className="modal-title h3 font-weight-bold">
                <Trans>Update Domain</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="domain_name">
                <Trans>Domain</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control-sm"
                  placeholder="Fairlinked.com"
                  name="domain_name"
                  id="domain_name"
                  aria-label="domain_name"
                  value={domain_name}
                  disabled
                  // onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="price">
                <Trans>Price</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control-sm"
                  placeholder="499.00"
                  name="price"
                  aria-label="price"
                  value={price}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                >
                  <option value="">Select category</option>
                  {this.state.domainCategoryList.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold"><Trans>Anchor text</Trans></label>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="anchorText1">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="anchorText"
                      id="anchorText1"
                      value={"As desired"}
                      checked={anchorText === "As desired"}
                      onChange={this.handleChange}
                    />
                    <i className="input-helper"></i>
                    <Trans>As desired</Trans>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="anchorText2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="anchorText"
                      id="anchorText2"
                      onChange={this.handleChange}
                      checked={anchorText === "No restrictions"}
                      value={"No restrictions"}
                    />
                    <i className="input-helper"></i>
                    <Trans>No restrictions</Trans>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="deliveryTime">
                <Trans>Delivery time (in days)</Trans>
                </label>
                <Form.Control
                  type="number"
                  className="form-control-sm"
                  placeholder="0"
                  name="deliveryTime"
                  aria-label="deliveryTime"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold">
                <Trans>Relationship attribute</Trans>
                </label>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="attribute">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="attribute"
                      id="attribute"
                      value={"dofollow"}
                      checked={attribute === "dofollow"}
                      onChange={this.handleChange}
                    />
                    <i className="input-helper"></i>
                    <Trans>dofollow</Trans>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="attribute2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="attribute"
                      id="attribute2"
                      onChange={this.handleChange}
                      checked={attribute === "nofollow"}
                      value={"nofollow"}
                    />
                    <i className="input-helper"></i>
                    <Trans>nofollow</Trans>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold">
                <Trans>Sensitive topics allowed?</Trans>
                </label>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="sensitiveTopic">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sensitiveTopic"
                      id="sensitiveTopic"
                      value={"1"}
                      checked={sensitiveTopic == "1"}
                      onChange={this.handleChange}
                    />
                    <i className="input-helper"></i>
                    <Trans>Yes</Trans>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="sensitiveTopic2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sensitiveTopic"
                      id="sensitiveTopic2"
                      onChange={this.handleChange}
                      checked={sensitiveTopic == "0"}
                      value={"0"}
                    />
                    <i className="input-helper"></i>
                    <Trans>No</Trans>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <label
                  className="font-weight-bold"
                  htmlFor="sensitiveTopicCharge"
                >
                  <Trans>Additional charge for sensitive topics</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control-sm"
                  placeholder="499.00"
                  name="sensitiveTopicCharge"
                  aria-label="sensitiveTopicCharge"
                  value={sensitiveTopicCharge}
                  id="sensitiveTopicCharge"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold" htmlFor="minWordCount">
                <Trans>Minimum word count</Trans>
                </label>
                <Form.Control
                  type="text"
                  className="form-control-sm"
                  placeholder="499.00"
                  name="minWordCount"
                  aria-label="minWordCount"
                  id="minWordCount"
                  value={minWordCount}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold">
                <Trans>Text creation allowed by customers?</Trans>
                </label>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="textByCustomer">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="textByCustomer"
                      id="textByCustomer"
                      value={1}
                      checked={textByCustomer == "1"}
                      onChange={this.handleChange}
                    />
                    <i className="input-helper"></i>
                    <Trans>Yes</Trans>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="textByCustomer2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="textByCustomer"
                      id="textByCustomer2"
                      onChange={this.handleChange}
                      checked={textByCustomer == "0"}
                      value={0}
                    />
                    <i className="input-helper"></i>
                    <Trans>No</Trans>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold"><Trans>Text included</Trans></label>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="textInclude">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="textInclude"
                      id="textInclude"
                      value={1}
                      checked={textInclude == 1}
                      onChange={this.handleChange}
                    />
                    <i className="input-helper"></i>
                    <Trans>Yes</Trans>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="textInclude2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="textInclude"
                      id="textInclude2"
                      onChange={this.handleChange}
                      checked={textInclude == 0}
                      value={0}
                    />
                    <i className="input-helper"></i>
                    <Trans>No</Trans>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <label className="font-weight-bold"><Trans>Language</Trans></label>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="language">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="language"
                      id="language"
                      value={"en"}
                      checked={language === "en"}
                      onChange={this.handleChange}
                    />
                    <i className="input-helper"></i>
                    <Trans>English</Trans>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="language2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="language"
                      id="language2"
                      onChange={this.handleChange}
                      checked={language === "de"}
                      value={"de"}
                    />
                    <i className="input-helper"></i>
                    <Trans>German</Trans>
                  </label>
                </div>
              </Form.Group>
              <Button
                className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                onClick={() => this.handleDomainAddSubmit()}
              >
                <Trans>Update Domain</Trans>
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default UpdatePublisherProjects;
