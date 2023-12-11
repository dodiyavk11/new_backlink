import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../assets/custom.css";
import ApiServices from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../shared/CartItem";
export class Cart extends Component {
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
      cartItems: [],
    };
  }
  componentDidMount() {
    ApiServices.getUserCartData()
      .then((res) => {
        if (!res.status) {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          // this.setState({ cartItems: res.data.data });
          const cartItems = res.data.data.map(item => item.cartItems);
          this.setState({ cartItems });
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
  handleWordCount = (cartItemId, value, price) => {
    // this.setState({
    //   wordCount: value,
    //   textCreationPrice: price,
    // });
    // this.updateSubmitDisabled();
    const updatedCartItems = this.state.cartItems.map((cartItem) => {
      if (cartItem.cart_id === cartItemId) {
        return {
          ...cartItem,
          cartItems: {
            ...cartItem.cartItems,
            wordCount: value,
            textCreationPrice: price,
          },
        };
      }
      return cartItem;
    });
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
    const { textCreation, filename, linktarget, anchortext } = this.state;
    let isSubmitDisabled;
    if (textCreation === "Own") {
      isSubmitDisabled = !filename || !linktarget || !anchortext;
    } else if (textCreation === "Editorial") {
      isSubmitDisabled = !linktarget || !anchortext;
    } else {
      isSubmitDisabled = false;
    }

    this.setState({ submitDisabled: isSubmitDisabled });
  };

  updateCartItem = (itemId, updatedItem) => {
    this.setState((prevState) => ({
      cartItems: prevState.cartItems.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      ),
    }));
  };
  handleSubmit = () => {
    // Access this.state.cartItems and send the data to your server
    const { cartItems } = this.state;
    // ... perform submission logic
    console.log("Submitting cart items:", cartItems);
  };


  render() {
    const { cartItems } = this.state;
    return (
      <div className="CartPage">
        <div className="page-header">
          <h3 className="fontBold latterSpacing">Cart</h3>
        </div>
        <div className="row">
          <div className="col-lg-8 grid-margin">
            {cartItems.map((item,index) => (
              <div className="card mb-4 bRadius" key={index}>
                <div className="card-body dashboardCard">
                  <CartItem
                    key={item.id}
                    item={item}
                    updateCartItem={this.updateCartItem}
                  />
                </div>
              </div>
            ))}
            {/* <button onClick={this.handleSubmit}>Submit All Cart Items</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cart);
