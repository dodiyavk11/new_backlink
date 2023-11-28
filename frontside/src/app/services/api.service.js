import axios from "axios";
const APP_URL = "http://localhost:3000/";
// const APP_URL = "http://fairlinked.bestprojectmanagementtool.com/backend/";
class ApiServices {
  getDashboard() {
    const authToken = localStorage.getItem("token");
    return axios.get(APP_URL + "user/dashboard", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  addUserProject(formData) {
    const authToken = localStorage.getItem("token");
    return axios
      .post(APP_URL + "user/project", formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getUserProjects() {
    const authToken = localStorage.getItem("token");
    return axios
      .get(APP_URL + "user/projects",{
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        return response;
      });
  }
  getNotificationSetting()
  {
    const authToken = localStorage.getItem("token");
    return axios
      .get(APP_URL + "user/setting",{
        headers: { Authorization: `Bearer ${authToken}`}
      })
      .then((response) => {
        return response;
      });
  }

  updateNotificationSetting(formData)
  {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(APP_URL + "user/setting/notification", formData, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json', 
        },
      })
      .then((response) => {
        return response;
      });
  }
  getProfileData()
  {
    const authToken = localStorage.getItem("token");
    return axios
      .get(APP_URL + "account/user/profile",{
        headers: { Authorization: `Bearer ${authToken}`}
      })
      .then((response) => {
        return response;
      });
  }
  updateProfileData(formData)
  {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(APP_URL + "account/user/profile", formData, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json', 
        },
      })
      .then((response) => {
        return response;
      });
  }

  customProfileUpdateData(formData,url)
  {
    const authToken = localStorage.getItem("token");
    return axios
      .patch(APP_URL + url, formData, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json', 
        },
      })
      .then((response) => {
        return response;
      });
  }
}

export default new ApiServices();
