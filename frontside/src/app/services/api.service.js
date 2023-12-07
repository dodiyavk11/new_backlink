import axios from "axios";
require("dotenv").config();

class ApiServices {
  APP_URL = process.env.REACT_APP_BASE_URL;
  getDashboard() {
    const authToken = localStorage.getItem("token");
    return axios.get(this.APP_URL + "user/dashboard", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  userAddStaticAmountTesting(amount) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(
        this.APP_URL + "user/static/amount",
        { amount: amount },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        return response;
      });
  }

  addUserProject(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(this.APP_URL + "user/project", formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getUserProjects() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "user/projects", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getDomainCategoryList() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "domainCategory/list", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getNotificationSetting() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "user/setting", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  updateNotificationSetting(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(this.APP_URL + "user/setting/notification", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      });
  }
  getProfileData() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "account/user/profile", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  updateProfileData(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(this.APP_URL + "account/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      });
  }

  customProfileUpdateData(formData, url) {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(this.APP_URL + url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      });
  }
  addToCartContentLink(hash_id) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "user/cart/add-item/" + hash_id;
    return axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  orderTextFileUpload(file) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "files";
    return axios
      .post(
        url,
        { file },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  orderUplodedDelete(filename) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "files/delete/" + filename;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }

  singleContentLinkPlaceOrder(orderData, contetnId) {
    const authToken = localStorage.getItem("token");
    const {
      anchortext,
      linktarget,
      publication_date,
      note,
      project_id,
      originalname,
      filename,
      textCreation,
      chooseByBacklink,
      textCreationPrice,
      approveTextPrice,
      approveText,
      wordCount,
    } = orderData;
    const url = `${this.APP_URL}order/${contetnId}/placeOrder`;
    return axios
      .post(
        url,
        {
          anchortext,
          linktarget,
          publication_date,
          note,
          project_id,
          originalname,
          filename,
          textCreation,
          chooseByBacklink,
          textCreationPrice,
          approveTextPrice,
          approveText,
          wordCount,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  getUserOrderList() {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "user/orders";
    return axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  userOrderListFilter(filterData) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "user/orders";
    return axios
      .post(url, filterData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      });
  }
  UsererOrderView(orderId) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "user/order/view/" + orderId;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }

  userCancelOrder(orderId) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "order/cancelOrder/" + orderId;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }

  getContentLinkList(filterdata = null) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(this.APP_URL + "contentlinks", filterdata, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  getUserCartData(filterdata = null) {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "user/cart", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  deleteItemFromCart(cartId) {
    const authToken = localStorage.getItem("token");
    return axios
      .delete(this.APP_URL + "user/cart/" + cartId, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  getPublisherDomainList() {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "publisher/domains";
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }

  publisherAddDomain(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(this.APP_URL + "publisher/addDomain", formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  async publisherUploadExcelFile(fileData) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "publisher/domain/excelUpload";
    return await axios
      .post(url, fileData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response;
      });
  }
  getPublisherOrderList() {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "publisher/orders";
    return axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  publisherOrderFilter(filterData) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "publisher/orders";
    return axios
      .post(url, filterData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }
  publisherOrderView(orderId) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "publisher/order/view/" + orderId;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }
  publisherUpdateOrderStatus(order_id, status) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + "publisher/updateOrderStatus/" + order_id;
    return axios
      .post(
        url,
        { status },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
}

export default new ApiServices();
