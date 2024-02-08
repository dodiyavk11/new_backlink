import React, { Component } from "react";
import { Modal, Form } from "react-bootstrap";
import "../../assets/custom.css";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";
import CurrencyFormatter from "./CurrencyFormatter";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de/index.js";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("de", de);

class PlaceOrderDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      textCreation: "Editorial",
      wordCount: 500,
      approveText: 0,
      textCreationPrice: 0,
      approveTextPrice: 0,
      projectsData: [],
      project_id: "",
      chooseByBack: false,
      publication_date: "",
      note: "",
      linktarget: "",
      anchortext: "",
      filename: "",
      originalname: "",
      submitDisabled: true,
    };
  }
  componentDidMount() {
    ApiServices.getUserProjects()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({ projectsData: res.data.data });
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
  }

  handleChangeProject = (event) => {
    this.setState({ project_id: event.target.value });
    this.updateSubmitDisabled();
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.updateSubmitDisabled();
  };

  handleDateChange = (publication_date) => {
    if (publication_date === null) {
      this.setState({ publication_date: '' });
    }
    else{
      this.setState({ publication_date: publication_date });
    }    
  };

  handleRadioChange = (value) => {
    this.setState(
      {
        textCreation: value,
      },
      () => {
        if (this.state.textCreation === "Own") {
          this.setState({
            wordCount: 0,
            approveText: 0,
            approveTextPrice: 0,
            textCreationPrice: 0,
          });
        } else {
          this.setState({
            wordCount: 500,
          });
        }
      }
    );
  };
  handleWordCount = (value, price) => {
    this.setState({
      wordCount: value,
      textCreationPrice: price,
    });
    this.updateSubmitDisabled();
  };
  handleApproveText = (price) => {
    this.setState((prevState) => ({
      approveText: prevState.approveText === 0 ? 1 : 0,
      approveTextPrice: this.state.approveText ? 0 : price,
    }));
    this.updateSubmitDisabled();
  };

  handlechooseByBackChange = () => {
    this.setState((prevState) => ({
      chooseByBack: !prevState.chooseByBack,
      anchortext: !prevState.chooseByBack ? "" : "",
    }));
    this.updateSubmitDisabled();
  };

  handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    this.setState((prevState) => ({
      [name]: type === "checkbox" ? checked : value,
    }));
    this.updateSubmitDisabled();
  };
  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    ApiServices.orderTextFileUpload(file).then(
      (res) => {
        if (res.data.status) {
          this.updateSubmitDisabled();
          this.setState({
            filename: res.data.data.filename,
            originalname: res.data.data.originalname,
          });
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
  handleDownloadFile = () => {
    const filename = this.state.filename;
    const downloadUrl =
      process.env.REACT_APP_BASE_URL + "assets/temp_file/" + filename;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  handleRemoveFile = () => {
    const filename = this.state.filename;
    ApiServices.orderUplodedDelete(filename).then(
      (res) => {
        if (res.data.status) {
          this.updateSubmitDisabled();
          this.setState({
            filename: "",
            originalname: "",
          });
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

  updateSubmitDisabled = () => {
    const { textCreation, filename, linktarget, anchortext, chooseByBack } =
      this.state;
    let isSubmitDisabled;
    if (textCreation === "Own") {
      isSubmitDisabled = !filename || !linktarget || !anchortext;
    } else if (textCreation === "Editorial") {
      // isSubmitDisabled = !linktarget || !anchortext;
      isSubmitDisabled = !linktarget || (chooseByBack && anchortext === null);
    } else {
      isSubmitDisabled = false;
    }

    this.setState({ submitDisabled: isSubmitDisabled });
  };
  handleplaceOrder = () => {
    const contentLinkId = this.props.contentLinkId;
    const {
      wordCount,
      textCreation,
      filename,
      linktarget,
      anchortext,
      project_id,
      publication_date,
      note,
      originalname,
      chooseByBack,
      textCreationPrice,
      approveTextPrice,
      approveText,
    } = this.state;
    let formattedDate;
    if (publication_date !== "") {
      const inputDate = new Date(publication_date);
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");

      formattedDate = `${year}-${month}-${day}`;
    }
    const formData = {
      anchortext: anchortext,
      linktarget: linktarget,
      publication_date: formattedDate,
      note: note,
      project_id: project_id,
      originalname: originalname,
      filename: filename,
      textCreation: textCreation,
      chooseByBacklink: chooseByBack,
      textCreationPrice: textCreationPrice,
      approveTextPrice: approveTextPrice,
      approveText: approveText,
      wordCount: wordCount,
    };
    ApiServices.singleContentLinkPlaceOrder(formData, contentLinkId).then(
      (res) => {
        if (res.data.status) {
          this.setState({
            isChecked: false,
            textCreation: "Editorial",
            wordCount: 500,
            approveText: 0,
            textCreationPrice: 0,
            approveTextPrice: 0,
            projectsData: [],
            project_id: "",
            chooseByBack: false,
            publication_date: "",
            note: "",
            linktarget: "",
            anchortext: "",
            filename: "",
            originalname: "",
            submitDisabled: true,
          });
          this.props.handleClose();
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
    const {
      textCreation,
      wordCount,
      approveText,
      textCreationPrice,
      approveTextPrice,
      chooseByBack,
      project_id,
      note,
      publication_date,
      linktarget,
      anchortext,
      filename,
      originalname,
      submitDisabled,
    } = this.state;
    const totalAmount = (
      (Number(this.props.contetnPrice) || 0) +
      (Number(this.state.textCreationPrice) || 0) +
      (Number(this.state.approveTextPrice) || 0)
    ).toFixed(2);
    return (
      <Form>
        <ToastContainer />
        <div className="modal1">
          <Modal
            className="orderConfigureStep1 p-2"
            centered
            backdrop="static"
            keyboard={false}
            show={this.props.showModal}
            onHide={this.props.handleClose}
          >
            <Modal.Header closeButton>
              <div className="text-center p-4">
                <span className="text-center customText">
                  <Trans>STEP</Trans> 1/2
                </span>
                <p className="modal-title h3 font-weight-bold pb-2 pt-2">
                  <Trans>Configuration</Trans>
                </p>
                <p className="mb-8">
                  <Trans>
                    Configure your order here. You can have the text written by
                    our editorial team or provide the text yourself. For some
                    links, only text creation by the publisher is possible
                  </Trans>
                  .
                </p>
              </div>
            </Modal.Header>
            <Modal.Body className="pt-1">
              <div className="row">
                <div className="col-sm-12">
                  <label className="mb-0">
                    <Trans>Text creation</Trans>
                  </label>
                  <p className="customText mb-0">
                    <Trans>Who should write your content?</Trans>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label
                    className={`${
                      textCreation === "Editorial"
                        ? "custom-buttonRadio checked"
                        : "custom-buttonRadio"
                    }`}
                  >
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      value="Editorial"
                      checked={textCreation === "Editorial"}
                      onChange={() => this.handleRadioChange("Editorial")}
                    />
                    <i
                      className={
                        textCreation === "Editorial"
                          ? "mdi mdi-check-circle"
                          : "mdi mdi-checkbox-blank-circle-outline"
                      }
                    ></i>{" "}
                    <Trans>Editorial text</Trans>
                  </label>
                </div>
                <div>
                  <label
                    className={`${
                      textCreation === "Own"
                        ? "custom-buttonRadio checked"
                        : "custom-buttonRadio"
                    }`}
                  >
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      value="Own"
                      checked={textCreation === "Own"}
                      onChange={() => this.handleRadioChange("Own")}
                    />
                    <i
                      className={
                        textCreation === "Own"
                          ? "mdi mdi-check-circle"
                          : "mdi mdi-checkbox-blank-circle-outline"
                      }
                    ></i>{" "}
                    <Trans>Write your own</Trans>
                  </label>
                </div>
              </div>
              <div className="w-full border mb-4 p-3 rounded mt-2">
                <div>
                  <span>
                    <Trans>
                      This publisher accepts websites from any subject area
                    </Trans>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <label className="mb-0">
                    <Trans>Word count</Trans>
                  </label>
                  <p className="customText mb-0">
                    <Trans>How long should the article be?</Trans>
                  </p>
                </div>
              </div>
              <div
                className={`d-flex justify-content-between ${
                  textCreation === "Own" ? "opacityDown-50" : ""
                }`}
              >
                <div>
                  <label
                    className={`${
                      wordCount === 500
                        ? "custom-buttonRadio checked"
                        : "custom-buttonRadio"
                    }`}
                  >
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      value={500}
                      name="wordCount"
                      checked={wordCount === 500}
                      onChange={() => this.handleWordCount(500, 0)}
                    />
                    <i
                      className={
                        wordCount === 500
                          ? "mdi mdi-check-circle"
                          : "mdi mdi-checkbox-blank-circle-outline"
                      }
                    ></i>{" "}
                    500 <Trans>Words</Trans>
                    <span className="float-right fontBold500">
                      <Trans>Free</Trans>
                    </span>
                  </label>
                </div>
                <div>
                  <label
                    className={`${
                      wordCount === 1000
                        ? "custom-buttonRadio checked"
                        : "custom-buttonRadio"
                    }`}
                  >
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      name="wordCount"
                      value={1000}
                      checked={wordCount === 1000}
                      onChange={() => this.handleWordCount(1000, 50)}
                    />
                    <i
                      className={
                        wordCount === 1000
                          ? "mdi mdi-check-circle"
                          : "mdi mdi-checkbox-blank-circle-outline"
                      }
                    ></i>{" "}
                    1000 <Trans>Words</Trans>
                    <span className="float-right fontBold600">
                      +{CurrencyFormatter.formatCurrency(50)}
                    </span>
                  </label>
                </div>
              </div>
              <div
                className={`w-full border mb-4 p-3 rounded ${
                  textCreation === "Own" ? "opacityDown-50" : ""
                }`}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <label
                      onClick={() => this.handleApproveText(27)}
                      // onClick={this.handleApproveText(27)}
                      className="mb-0"
                    >
                      <i
                        style={{ color: "#ff9756" }}
                        className={
                          approveText === 1
                            ? "mdi mdi-check-circle"
                            : "mdi mdi-checkbox-blank-circle-outline"
                        }
                      ></i>{" "}
                      <span>
                        <Trans>Approve text before publication</Trans>
                      </span>
                    </label>
                  </div>
                  <div>
                    <span
                      style={{ color: "#ff9756" }}
                      className="fontBold700 mr-2"
                    >
                      <Trans>NEW</Trans>
                    </span>
                    <span className="float-right fontBold600">
                      +{CurrencyFormatter.formatCurrency(27.0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <p className="textLeft">
                    <Trans>Base price</Trans>
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="textRight">
                    {CurrencyFormatter.formatCurrency(this.props.contetnPrice)}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <p className="textLeft">
                    <Trans>Text creation Text from FairLinked editors</Trans>
                  </p>
                </div>
                <div className="col-sm-4">
                  <p className="textRight">
                    {textCreationPrice === 0 ? (
                      <Trans>Free</Trans>
                    ) : (
                      <span>
                        {CurrencyFormatter.formatCurrency(textCreationPrice)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {approveText !== 0 && (
                <div className="row">
                  <div className="col-sm-6">
                    <p className="textLeft">
                      <Trans>Text approval</Trans>
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="textRight">
                      {CurrencyFormatter.formatCurrency(approveTextPrice)}
                    </p>
                  </div>
                </div>
              )}
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p className="textLeft">
                    <Trans>Total</Trans>
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="textRight h4 fontBold700">
                    {CurrencyFormatter.formatCurrency(totalAmount)}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <button
              className="btn btn-rounded btn-lg font-weight-medium"
              onClick={this.props.handleNextStep}
            >
              <Trans>Next step</Trans>
            </button>
          </Modal>
        </div>
        <div className="modal2">
          <Modal
            className="orderConfigureStep2 p-2"
            centered
            backdrop="static"
            keyboard={false}
            show={this.props.showModal2}
            onHide={this.props.handleClose}
          >
            <Modal.Header closeButton>
              <div className="textCenter p-4">
                <span className="textCenter customText">
                  <Trans>STEP</Trans> 1/2
                </span>
                <p className="modal-title textCenter h3 font-weight-bold pb-2 pt-2">
                  <Trans>Link target and anchor text</Trans>
                </p>
                <span className="textCenter">
                  <Trans>
                    Configure your order here. You can have the text written by
                    our editorial team or provide the text yourself. For some
                    links, only text creation by the publisher is possible
                  </Trans>
                  .
                </span>
                <p className="textCenter fontBold600 mt-2">
                  <Trans>Complete the necessary data for your order here</Trans>
                  .
                </p>
              </div>
            </Modal.Header>
            <Modal.Body className="pt-1">
              <div className="row">
                <div className="col-sm-12">
                  <label htmlFor="targetUrl">
                    <Trans>Target URL</Trans>*
                    <p className="customText mb-0">
                      <Trans>Who should write your content?</Trans>
                    </p>
                  </label>

                  <input
                    type="text"
                    name="linktarget"
                    className="form-control"
                    id="targetUrl"
                    placeholder="Target Url"
                    onChange={this.handleChange}
                    value={linktarget}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label htmlFor="anchortext">
                    <Trans>Anchor text</Trans>*
                    <p className="customText mb-0">
                      <Trans>
                        Specify which anchor text to use. How to choose your
                        anchor text correctly, you will learn here Nontheless,
                        the publisher has the final say in the anchor text
                        selection
                      </Trans>
                      .
                    </p>
                  </label>

                  <input
                    type="text"
                    name="anchortext"
                    className="form-control"
                    id="anchortext"
                    value={anchortext}
                    placeholder="High quality backlinks"
                    disabled={chooseByBack}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12 mt-1">
                  <input
                    type="checkbox"
                    name="chooseByBack"
                    id="chooseByBack"
                    checked={chooseByBack}
                    onChange={this.handlechooseByBackChange}
                  />
                  <label htmlFor="chooseByBack">
                    <Trans>Have anchor text chosen by FairLinked</Trans>
                  </label>
                </div>
              </div>
              {textCreation === "Own" && filename === "" ? (
                <div className="row mt-1 fileinputcustom">
                  <div className="col-sm-12">
                    <input
                      type="file"
                      id="filename"
                      style={{ display: "none" }}
                      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, text"
                      onChange={this.handleFileUpload}
                    />
                    <label
                      className="cursorClass"
                      htmlFor="filename"
                      style={{ width: "100%" }}
                    >
                      <div className="w-full border p-4 rounded mt-2 textCenter borderDashed">
                        <p className="mb-1 text-sm">
                          <Trans>Click here to select file</Trans>
                        </p>
                        <p className="mb-1 text-sm">.doc / .docx </p>
                      </div>
                    </label>
                  </div>
                </div>
              ) : null}
              {filename && textCreation === "Own" && (
                <div className="row">
                  <div className="col-sm-12">
                    <div className="w-full border p-3 rounded textCenter borderDashed d-flex justify-content-between">
                      <div>
                        <span className="verticalAlign">{originalname}</span>
                      </div>
                      <div>
                        <i
                          className="mdi mdi-arrow-down-bold-circle-outline iconFontSize"
                          onClick={() => this.handleDownloadFile()}
                        ></i>
                        <i
                          className="mdi mdi-close-circle-outline iconFontSize"
                          onClick={() => this.handleRemoveFile()}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label htmlFor="publication_date">
                    <Trans>Date (optional)</Trans>
                    <p className="customText mb-0">
                      <Trans>When should your contentlink be placed?</Trans>
                    </p>
                  </label><br/>
                  {/* <input
                    type="date"
                    name="publication_date"
                    className="form-control border"
                    id="publication_date"
                    placeholder="03/03/2024"
                    onChange={this.handleChange}
                    value={publication_date}
                    min={new Date().toISOString().split('T')[0]}
                  /> */}
                  <DatePicker
                    name="publication_date"
                    selected={this.state.publication_date}
                    onChange={this.handleDateChange}
                    isClearable
                    className="form-control"
                    locale="de"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label htmlFor="note">
                    <Trans>Note (optional)</Trans>
                    <p className="customText mb-0">
                      <Trans>
                        Enter a topic request here, for example. The respective
                        publisher has the final say in the choice of topic
                      </Trans>
                      .
                    </p>
                  </label>
                  <textarea
                    name="note"
                    id="note"
                    className="form-control"
                    placeholder="Please note the following..."
                    onChange={this.handleChange}
                    value={note}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label htmlFor="project_id">
                    <Trans>Project</Trans>
                    <p className="customText mb-0">
                      <Trans>Select a project</Trans>.
                    </p>
                  </label>
                  <select
                    className="form-control"
                    id="project_id"
                    value={project_id}
                    onChange={this.handleChangeProject}
                  >
                    <option value="">Select...</option>
                    {this.state.projectsData.map((option) => (
                      <option key={option.id} value={option.hash_id}>
                        {option.domain_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Modal.Body>
            <button
              className="btn btn-rounded btn-lg font-weight-medium mb-2"
              disabled={submitDisabled}
              onClick={this.handleplaceOrder}
            >
              <Trans>Buy now for</Trans>{" "}
              {CurrencyFormatter.formatCurrency(totalAmount)}
            </button>
            <button
              className="btn btn-primary btn btn-rounded custamFilterBtn"
              onClick={this.props.handleBackStep}
            >
              <Trans>Back</Trans>
            </button>
          </Modal>
        </div>
      </Form>
    );
  }
}

export default PlaceOrderDetailsModal;
