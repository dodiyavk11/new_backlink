import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiServices from "../services/api.service";
import Tooltip from "@material-ui/core/Tooltip";
import "react-toastify/dist/ReactToastify.css";
import TimeAgo from "timeago-react";
import { ToastContainer, toast } from "react-toastify";

export class MessageComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: this.props.order_id,
      messageHistory: [],
      currentUser: 0,
      message: "",
    };
    this.messagesEndRef = React.createRef();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  deleteMessage = (id) => {
    ApiServices.orderMessageDelete(this.state.currentOrder, id).then((res) => {
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
    const currentOrder = this.state.currentOrder;
    if (message === "") {
      toast.error("Message cannot be empty.", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    }
    ApiServices.orderMessageSend(currentOrder, message).then((res) => {
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
    });
  };

  getOrderMessageHistory() {
    const currentOrder = this.state.currentOrder;
    ApiServices.getOrderMessageHistory(currentOrder).then((res) => {
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
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.messageHistory !== this.state.messageHistory) {
      this.scrollToBottom();
    }
  }
  scrollToBottom = () => {
    if(this.props.isShowTypeMsg)
    { 
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
                <p className="mb-0 fw-bold">Order Message</p>
              </div>
              <div
                className="card-body border"
                style={{ maxHeight: "470px", overflowY: "auto" }}
              >
                {messageHistory.length > 0 ? (
                  messageHistory.map((message) => (
                    <React.Fragment key={message.id}>
                      {message.sender_id === currentUser ? (
                        <>
                          <div className="d-flex flex-row justify-content-end">
                            <div
                              className="p-3 me-3 border"
                              style={{
                                borderRadius: "15px",
                                backgroundColor: "#fbfbfb",
                              }}
                            >
                              <p className="small mb-0">{message.message}</p>
                            </div>
                            <img
                              src={require("../../assets/images/faces-clipart/pic-4.png")}
                              alt="You"
                              title="You"
                              style={{ width: "45px", height: "100%" }}
                            />
                          </div>
                          <div className="text-end d-flex flex-row justify-content-end messageTime small mb-4">
                            <TimeAgo
                              datetime={message.created_at}
                              locale="en"
                            />
                            <i
                              className="mdi mdi-delete pl-1 cursorClass"
                              onClick={() => this.deleteMessage(message.id)}
                            ></i>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex flex-row justify-content-start">
                            <img
                              src={require("../../assets/images/faces-clipart/pic-1.png")}
                              alt="Publisher"
                              style={{ width: "45px", height: "100%" }}
                              title="Publisher"
                            />
                            <div
                              className="p-3 ms-3"
                              style={{
                                borderRadius: "15px",
                                backgroundColor: "rgba(57, 192, 237, .2)",
                              }}
                            >
                              <p className="small mb-0">{message.message}</p>
                            </div>
                          </div>
                          <div className="text-end small mb-4 pl-5 messageTime">
                            <TimeAgo
                              datetime={message.created_at}
                              locale="en"
                            />
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <p>
                    <b>No messages available.</b>
                  </p>
                )}
              </div>
              {this.props.isShowTypeMsg && (
                <div className="form-outline d-flex flex-row justify-content-start p-3">
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
                  <div ref={this.messagesEndRef}></div>
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
