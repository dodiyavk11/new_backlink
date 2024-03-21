import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trans } from "react-i18next";
import TimeAgo from "timeago-react";
import AdminBack from "../../shared/AdminBack";
import "../../../assets/custom.css";

export class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatListData: [],
    };
  }

  getChatList = () => {
    ApiServices.getPublisherChatList()
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          if (res.data.data) {
            this.setState({ chatListData: res.data.data });
          }
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
    this.getChatList();
  }
  makeid = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  handleClick = (domain_id, reciever_id) => {
    const randomId = this.makeid(6);
    localStorage.setItem("randomId", randomId);
    this.props.history.push(
      `/publisher/chat/${domain_id}/${reciever_id}/${randomId}`
    );
  };

  render() {
    const { chatListData } = this.state;

    return (
      <div className="ordersListPage">
        <div className="d-flex justify-content-between">
          <div className="page-header">
            <h3 className="fontBold latterSpacing">
              <Trans>Chat List</Trans> <AdminBack />
            </h3>
          </div>
          <ToastContainer />
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card mb-4 bRadius">
              <div className="card-body projectsCard">
                {chatListData.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover orderListTable">
                      <thead>
                        <tr>
                          <th>
                            <Trans>Sr</Trans>
                          </th>
                          <th>
                            <Trans>Domain</Trans>
                          </th>
                          <th>
                            <Trans>New Message</Trans>
                          </th>
                          <th>
                            <Trans>User</Trans>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {chatListData.map((data, index) => (
                          <tr
                            onClick={() =>
                              this.handleClick(data.domain_id, data.sender_id)
                            }
                          >
                            <td>{index + 1}</td>
                            <td>{data.domain.domain_name}</td>
                            <td>
                              <span className="badge badge-danger">
                                {data.newMsg}
                              </span>
                            </td>
                            <td>{`${data.sender.firstName} ${data.sender.lastName}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="">
                    <center>
                      <div className="mt-5 mx-auto">
                        <img
                          src={require("../../../assets/images/empty.png")}
                          alt="No data found..."
                        />
                      </div>
                      <h4>
                        <Trans>No Chat found.</Trans>
                      </h4>
                      <p style={{ maxWidth: "400px" }}></p>
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ChatList);
