import React, { Component } from "react";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import TimeAgo from "timeago-react";
import "react-toastify/dist/ReactToastify.css";
import AddPublisherProjects from "../common/AddPublisherProjects";
import PublisherUplaodExcelDomain from "../common/PublisherUplaodExcelDomain";
import { Trans } from "react-i18next";
import "../../../assets/custom.css";
import CurrencyFormatter from "../../shared/CurrencyFormatter"
import AdminBack from "../../shared/AdminBack";

export class Domain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalExcel: false,
      publisherDomainList: [],
      imageExists: true,
    };
  }
  showAddDomainModal = () => this.setState({ showModal: true });
  closeAddDomainModal = () => this.setState({ showModal: false });

  showAddExcelModal = () => this.setState({ showModalExcel: true });
  closeAddExcelModal = () => this.setState({ showModalExcel: false });

  goToDomainViewLink = (hash_id) => {
    this.props.history.push(`/publisher/domain/${hash_id}`);
  };

  checkImageExists = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      return response.ok;
    } catch (error) {
      console.error("Error checking image", error);
      return false;
    }
  };
  getPublisherDataList = () => {
    ApiServices.getPublisherDomainList()
      .then(async (res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          const domainList = res.data.data;
          const updatedDomainList = await Promise.all(
            domainList.map(async (domainsList) => {
              const imageUrl =
                ApiServices.APP_URL.replace(/\/$/, "") +
                "/assets/domain_img/" +
                domainsList.hash_id +
                ".png";

              const imageExists = await this.checkImageExists(imageUrl);
              return { ...domainsList, imageExists };
            })
          );

          this.setState({ publisherDomainList: updatedDomainList });
          // this.setState({ publisherDomainList: res.data.data });
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
    this.getPublisherDataList();
    this.props.publisherUnreadMessageCount();
  }

  render() {
    return (
      <div className="dashboardPublisher">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">
            <Trans>Domain</Trans> <AdminBack/>
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <div className="p-2 bd-highlight d-flex flex-column">
                    <h5 className="card-title">
                      <Trans>Domain</Trans>
                    </h5>
                  </div>
                  <div className="p-2 bd-highlight d-flex align-items-center justify-content-center">
                    <h5 className="card-title">
                      <span
                        className="createProject"
                        onClick={this.showAddDomainModal}
                      >
                        <i className="mdi mdi-plus mr-2"></i>
                        <Trans>Add Domain</Trans>
                      </span>
                    </h5>
                    <h5 className="card-title">
                      <span
                        className="createProject"
                        onClick={this.showAddExcelModal}
                      >
                        <i className="mdi mdi-upload ml-2"></i>
                        <Trans>Upload excel</Trans>
                      </span>
                    </h5>
                  </div>
                </div>
                <hr />
                {this.state.publisherDomainList.length > 0 ? (
                  <div
                    className="row"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {this.state.publisherDomainList.map((domain) => (
                      <div className="col-md-4 mb-2" key={domain.id}>
                        <div
                          className="card border rounded p-3 cursorClass"
                          onClick={() =>
                            this.goToDomainViewLink(domain.hash_id)
                          }
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "85%",
                          }}
                        >
                          {domain.imageExists ? (
                            <img
                              src={
                                ApiServices.APP_URL.replace(/\/$/, "") +
                                "/assets/domain_img/" +
                                domain.hash_id +
                                ".png"
                              }
                              className="card-img-top"
                              alt=""
                              style={{
                                flex: "1",
                                objectFit: "cover",
                                height: "200px",
                              }}
                            />
                          ) : (
                            <img
                              src={require("../../../assets/images/blank_image.jpg")}
                              className="card-img-top"
                              alt=""
                              height={200}
                              style={{ flex: "1", objectFit: "cover" }}
                            />
                          )}
                          <div
                            className="card-body activeProject"
                            style={{ flex: "1" }}
                          >
                            <h5 className="card-title">
                              {domain.domain_name}
                              {domain.status ? (
                                <span className="ml-2 badge badge-success">
                                  Active
                                </span>
                              ) : (
                                <span className="ml-2 badge badge-danger">
                                  Inactive
                                </span>
                              )}
                            </h5>
                            <div className="extraInfo d-flex flex-wrap justify-content-between">
                              <div>{CurrencyFormatter.formatCurrency(domain.price)}</div>
                              <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                              <div>{domain.category.name}</div>
                              <i className="mdi mdi-checkbox-blank-circle d-flex align-items-center justify-content-center iconBash"></i>
                              <div>
                                <TimeAgo
                                  datetime={domain.created_at}
                                  locale="en"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <center>
                    <div className="mt-5 mx-auto">
                      <img
                        src={require("../../../assets/images/empty.png")}
                        alt="No data found..."
                      />
                    </div>
                    <h2>
                      <Trans>No Domain</Trans>
                    </h2>
                    <p>
                      <Trans>
                        No Domain You do not have any Project yet. As soon as
                        you add your first Project, it will show up here.
                      </Trans>
                    </p>
                    <button className="btn btn-rounded btn-fw">
                      <span
                        className="createProject"
                        onClick={this.showAddDomainModal}
                      >
                        <i className="mdi mdi-plus mr-2"></i>
                        <Trans>Add Domain</Trans>
                      </span>
                    </button>
                  </center>
                )}
              </div>
            </div>
          </div>
        </div>
        <AddPublisherProjects
          showModal={this.state.showModal}
          handleClose={this.closeAddDomainModal}
          refreshData={this.getPublisherDataList}
        />
        <PublisherUplaodExcelDomain
          showModal={this.state.showModalExcel}
          handleClose={this.closeAddExcelModal}
          refreshData={this.getPublisherDataList}
        />
      </div>
    );
  }
}

export default Domain;
