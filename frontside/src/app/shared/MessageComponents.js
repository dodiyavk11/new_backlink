import React, { Component } from "react";
import ApiServices from "../services/api.service";
import "react-toastify/dist/ReactToastify.css";
import TimeAgo from "timeago-react";
import { ToastContainer, toast } from "react-toastify";
import { Trans } from "react-i18next";

export class MessageComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash_id: this.props.hash_id,
      domain_id: this.props.domain_id,
      reciever_id: this.props.reciever_id,
      messageHistory: [],
      currentUser: 0,
      message: "",
    };
    this.cardBodyRef = React.createRef();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  deleteMessage = (id) => {
    ApiServices.orderMessageDelete(this.state.domain_id, id).then((res) => {
      if (res.status) {
        this.getOrderMessageHistory();
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  };

  sendMessage = () => {
    const message = this.state.message;
    const domain_id = this.state.domain_id;
    const reciever_id = this.state.reciever_id;
    if (message === "") {
      toast.error("Message cannot be empty.", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    }
    ApiServices.orderMessageSend(domain_id, message, reciever_id).then(
      (res) => {
        if (res.status) {
          this.setState({
            message: "",
          });
          this.getOrderMessageHistory();
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    );
  };

  getOrderMessageHistory() {
    const domain_id = this.state.domain_id;
    ApiServices.getOrderMessageHistory(domain_id).then((res) => {
      if (res.status) {
        this.setState({
          messageHistory: res.data.data,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.setState({ currentUser: userData.id });
    }
    this.getOrderMessageHistory();
    this.interval = setInterval(() => {
      this.getOrderMessageHistory();
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.cardBodyRef.current) {
      const cardBodyDiv = this.cardBodyRef.current;
      cardBodyDiv.scrollTop = cardBodyDiv.scrollHeight;
    }
  };

  render() {
    const { messageHistory, currentUser, message } = this.state;
    return (
      <div className="col-lg-12 grid-margin">
        <ToastContainer />
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 p-0 mt-3">
            <div className="card" id="chat1">
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 text-white border-bottom-0"
                style={{ backgroundColor: "#ff9756" }}
              >
                <h4 className="mb-0 fw-bold">
                  <Trans>Chat</Trans>
                </h4>
              </div>
              <div
                className="card-body border"
                style={{ maxHeight: "470px", overflowY: "auto" }}
                ref={this.cardBodyRef}
              >
                {messageHistory.length > 0 ? (
                  messageHistory.map((message) => (
                    <React.Fragment key={message.id}>
                      {message.sender_id === currentUser ? (
                        <>
                          <div className="flex-row justify-content-end">
                            <div
                              style={{ textAlign: "end" }}
                              className="mr-2 mt-1"
                            >
                              <div className="text-end d-flex flex-row justify-content-end messageTime small">
                                <p className="m-1">
                                  <Trans>You</Trans>
                                </p>
                                <TimeAgo
                                  className="mt-2"
                                  datetime={message.created_at}
                                  locale="en"
                                />
                                {/* <i
                                  className="mdi mdi-delete pl-1 cursorClass"
                                  onClick={() => this.deleteMessage(message.id)}
                                ></i> */}
                              </div>
                            </div>
                            <div
                              className="p-3 me-3 border"
                              style={{
                                borderRadius: "15px",
                                backgroundColor: "rgb(53 66 82 / 14%)",
                                textAlign: "end",
                              }}
                            >
                              <p className="small mb-0">{message.message}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="justify-content-start mb-1">
                            <div>
                              {`${message.sender.firstName} ${message.sender.lastName} `}
                              <span className="messageTime">
                                <TimeAgo
                                  datetime={message.created_at}
                                  locale="en"
                                />
                              </span>
                            </div>
                            <div
                              className="p-3 ms-3"
                              style={{
                                borderRadius: "15px",
                                backgroundColor: "rgb(255 151 86 / 14%)",
                              }}
                            >
                              <p className="small mb-0">{message.message}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <p>
                    <b>
                      <Trans>No messages available.</Trans>
                    </b>
                  </p>
                )}
              </div>
              {this.props.isShowTypeMsg && (
                <div className="form-outline d-flex flex-row justify-content-start">
                  <textarea
                    className="form-control"
                    id="sendMessage"
                    rows="3"
                    name="message"
                    value={message}
                    placeholder="Type message here..."
                    onChange={this.handleChange}
                  ></textarea>
                  <i
                    className="ml-2 h1 mt-3 cursorClass mdi mdi-send"
                    title="Send"
                    onClick={this.sendMessage}
                  ></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MessageComponents;
