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
}

export default new ApiServices();
