import axios from "axios";
require("dotenv").config();

class ApiServices {
  APP_URL = process.env.REACT_APP_BASE_URL;
  getDashboard() {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}user/dashboard`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  userAddStaticAmountTesting(amount) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(
        `${this.APP_URL}user/static/amount`,
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
      .post(`${this.APP_URL}user/project`, formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getUserProjects() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}user/projects`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getDomainCategoryList() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}domainCategory/list`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getNotificationSetting() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}user/setting`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  updateNotificationSetting(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(`${this.APP_URL}user/setting/notification`, formData, {
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
      .get(`${this.APP_URL}account/user/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  updateProfileData(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(`${this.APP_URL}account/user/profile`, formData, {
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
      .patch(`${this.APP_URL}${url}`, formData, {
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
    const url = `${this.APP_URL}user/cart/add-item/${hash_id}`;
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
    const url = `${this.APP_URL}files`;
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
    const url = `${this.APP_URL}files/delete/${filename}`;
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

  cartPlaceOrder(orderData) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}order/cart/order`;
    return axios
      .post(url, orderData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      });
  }

  getUserOrderList() {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}user/orders`;
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
  SingleOrderView(orderId, urls) {
    const authToken = localStorage.getItem("token");
    const url = this.APP_URL + urls + orderId;
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

  getDailyDealsContentLink(filterdata = null) {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}daily-deal-contentlinks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  getAdminContentLinkList(filterdata = null) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(this.APP_URL + "admin/contentlinks", filterdata, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  getUserCartData() {
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

  getProjectViewData(hash_id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}user/domain/${hash_id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  AdminProjectViewData(hash_id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}admin/project/${hash_id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  updateMonthlyBudget(formData) {
    const authToken = localStorage.getItem("token");
    return axios.post(`${this.APP_URL}user/project/budget`, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  getPublisherDomainViewData(hash_id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}publisher/domain/${hash_id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  getPublisherDomainList() {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}publisher/domains`;
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
      .post(`${this.APP_URL}publisher/addDomain`, formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  async publisherUploadExcelFile(fileData) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}publisher/domain/excelUpload`;
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

  publisherUpdateOrderStatus(order_id, status) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}publisher/updateOrderStatus/${order_id}`;
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
  publisherDomainUpdate(domain_id, formData) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}publisher/updateDomain/${domain_id}`;
    return axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        return response;
      });
  }

  getOrderMessageHistory(orderId) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}message/get/${orderId}`;
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
  orderMessageSend(orderId, message) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}message/send/${orderId}`;
    return axios
      .post(
        url,
        { message },
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

  orderMessageDelete(orderId, msgId) {
    const authToken = localStorage.getItem("token");
    const url = `${this.APP_URL}message/delete/${msgId}`;
    return axios
      .post(
        url,
        { order_id: orderId },
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

  userProjectUpdateToArchive(status, hash_id) {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(
        `${this.APP_URL}domain/archive/${hash_id}/${status}`,
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

  userFavoriteUpdate(id) {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}contentlinks/${id}/favorite`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getPublisherMessageList(id) {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "publisher/message/list", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  adminGetAllOrders(filterdata = null) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(this.APP_URL + "admin/orders", filterdata, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  adminUserList(filterdata = null) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(this.APP_URL + "account/user/list", filterdata, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  createUpdateUser(formData, isEdit) {
    let url;
    if (isEdit) {
      url = "admin/update/user";
    } else {
      url = "account/user/create";
    }

    const authToken = localStorage.getItem("token");
    return axios.post(`${this.APP_URL}${url}`, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  blockUser(id, isDeleted) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}account/user/delete/${id}/${isDeleted}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  adminBacklinkView(hash_id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}admin/contentlinks/${hash_id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  adminUpdateBacklinkStatus(hash_id, status, id) {
    const authToken = localStorage.getItem("token");
    return axios.get(
      `${this.APP_URL}admin/contentlinks/${hash_id}/${status}/${id}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  adminProjectList(filter = null, tab) {
    const authToken = localStorage.getItem("token");
    return axios.get(
      `${this.APP_URL}admin/domain/list?q=${filter}&tab=${tab}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }
  subscriptionPlan() {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}subscriptionPlan/list`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  getLinkBundleBlogData() {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}admin/link-bundle-content`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  getLinkBundleBlogDataUpdate(formData) {
    const authToken = localStorage.getItem("token");
    return axios.patch(`${this.APP_URL}admin/link-bundle-content`, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  updatePlanStatus(id, status) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}admin/plan/update/${id}/${status}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  updateSubscriptionPlan(formData, id) {
    const authToken = localStorage.getItem("token");
    return axios.patch(
      `${this.APP_URL}subscriptionPlan/update/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  getEmailTemplate() {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}emailTemplate/list`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  updateEmailTemplate(formData, id) {
    const authToken = localStorage.getItem("token");
    const formDataObject = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObject.append(key, formData[key]);
    });
    return axios.patch(
      `${this.APP_URL}emailTemplate/edit/${id}`,
      formDataObject,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        "Content-Type": "multipart/form-data",
      }
    );
  }

  addEmailTemplate(formData) {
    const authToken = localStorage.getItem("token");
    return axios.post(`${this.APP_URL}emailTemplate/add`, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  emailTemplateDelete(id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}emailTemplate/delete/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  addDomainCategory(formData) {
    const authToken = localStorage.getItem("token");
    return axios.post(`${this.APP_URL}domainCategory/add`, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  updateDomainCategory(formData, id) {
    const authToken = localStorage.getItem("token");
    return axios.patch(`${this.APP_URL}domainCategory/edit/${id}`, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  domainCategoryDelete(id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}domainCategory/delete/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  getUserWalletBalance() {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}user/get/balance`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  checkBalanceForBundle(id) {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}linkBundle/${id}/check`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  linkBundlePlaceOrder(orderData, planId) {
    const authToken = localStorage.getItem("token");
    return axios.post(
      `${this.APP_URL}link-bundle/${planId}/placeOrder`,
      orderData,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  userPaymetnTransaction() {
    const authToken = localStorage.getItem("token");
    return axios.get(`${this.APP_URL}user/transactionHistory`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  sendPaymentResponse(paymentId, paymentData) {
    const authToken = localStorage.getItem("token");
    return axios.post(
      `${this.APP_URL}paymentRespone/${paymentId}`,
      paymentData,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  userContactUs(formData) {
    // return axios.post(`${this.APP_URL}user/contact-us`, formData);
    return axios.post(`${this.APP_URL}user/contact-us`, formData, {
      headers: { Authorization: `Bearer tesjdsdddsdskksks` },
    });
  }

  adminContactUsData() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(this.APP_URL + "admin/contact-us-data", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  markAsSolved(id) {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}admin/mark-resolved/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  generateInvoicePdf(data) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(`${this.APP_URL}user/generate-invoice`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  exportOrderCsv() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}publisher/orders/export`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  publisherUnreadMessageCount(){
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}publisher/message/unread`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }

  publisherReadMessage(order_id){
    const authToken = localStorage.getItem("token");
    return axios
      .get(`${this.APP_URL}publisher/message/read/${order_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
}

export default new ApiServices();
