import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import { Trans } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/custom.css";
class PublisherUplaodExcelDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      error: "",
    };
  }
  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ file });
  };

  handleDomainAddSubmit = () => {
    const formData = new FormData();
    formData.append("file", this.state.file);
    if (!this.state.file) {
      this.setState({ error: "File are required fields." });
    } else {
      ApiServices.publisherUploadExcelFile(formData).then(
        (res) => {
          this.props.handleClose();
          this.setState({
            file: null,
          });
          if (res.status) {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              onClose: this.props.refreshData(),
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
    }
  };
  render() {
    const { file, error } = this.state;
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
                <Trans>Upload Excel file</Trans>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <label className="font-weight-bold mb-4" htmlFor="file">
                  <Trans>Upload Excel file</Trans>
                  <span className="sampleFile ml-4">
                    <a
                      href={`${ApiServices.APP_URL.replace(
                        /\/$/,
                        ""
                      )}/assets/sample_excel.xlsx`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hrefTitle"
                    >
                      <b className="text-warning">
                        <Trans>Download sample excel file</Trans>
                      </b>
                    </a>
                  </span>
                </label>
                <Form.File
                  id="file"
                  name="file"
                  label={file ? file.name : "Choose file"}
                  custom
                  onChange={this.handleFileChange}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button
                className="btn btn-block btn-rounded btn-lg font-weight-medium auth-form-btn"
                onClick={() => this.handleDomainAddSubmit()}
              >
                <Trans>Upload</Trans>
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default PublisherUplaodExcelDomain;
