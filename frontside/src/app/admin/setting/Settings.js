import React, { Component } from "react";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/auth.service";
import { Button, Form } from "react-bootstrap";
import { Trans, withTranslation } from "react-i18next";
import "../../../assets/custom.css";
import "react-quill/dist/quill.snow.css";

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: [],
    };
  }

  handleEditSettings = (value, name) => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [name]: value,
      },
    }));
  };

  getSettings() {
    ApiServices.getSettings()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          this.setState({
            settings: res.data.data,
          });
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 401 &&
          err.response.data.message !== "You cannot access this page"
        ) {
          this.setState({ isAuthenticated: false });
          AuthService.logout();
          this.props.history.push("/login");
        } else {
          if (err.response) {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        }
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { settings } = this.state;
    if (settings.vat) {
      ApiServices.updateAdminSetting(settings)
        .then((res) => {
          if (res.status) {
            this.getSettings();
            toast.success(
              <Trans>Setting data update successfully.</Trans>,
              {
                position: "top-right",
                autoClose: 2000,
              }
            );
          } else {
            toast.success(<Trans>Something went to wrong.</Trans>, {
              position: "top-right",
              autoClose: 2000,
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        });
    } else {
      toast.error(<Trans>Please fill required fields.</Trans>, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  componentDidMount() {
    this.getSettings();
  }
  render() {
    const { settings } = this.state;
    const { t } = this.props;
    return (
      <div className="adminUserList">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Settings</Trans>
            </h3>
          </div>          
        </div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <label className="font-weight-bold" htmlFor="vat">
                      <Trans>VAT</Trans>                      
                    </label>
                    <Form.Control
                      required
                      type="number"
                      className="form-control form-control-lg"
                      placeholder={t("VAT e.g 19")}
                      name="vat"
                      id="vat"
                      aria-label="vat"
                      value={(settings && settings.vat) || ""}
                      // onChange={this.handleEditSettings}
                      onChange={(e) => this.handleEditSettings(e.target.value, 'vat')}
                    />
                    <span className="p-0 mt-2"><Trans>Default VAT is 19%</Trans></span>
                  </Form.Group>
                  <Button type="submit" className="btn btn-rounded btn-lg">
                    <Trans>Update</Trans>
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(Settings);
