import axios from "axios";
require('dotenv').config();

class AuthService {
  APP_URL = process.env.REACT_APP_BASE_URL;
  login(email, password) {
    return axios
      .post(this.APP_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isAdmin", response.data.data.isAdmin);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
        }
        return response;
      });
  }

  SignUp(formData) {
    return axios.post(this.APP_URL + "signup", formData);
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
  }

  getContentLinksData(hash_id) {
    const authToken = localStorage.getItem("token");
    return axios.get(this.APP_URL + "contentlinks/" + hash_id, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  getCartData() {
    const authToken = localStorage.getItem("token");
    return axios.get(this.APP_URL + "user/cart", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  forgotPasswordLinkGenerate(email) {
    return axios
      .post(this.APP_URL + "ForgotPasswordLink", {
        email,
      })
      .then((response) => {
        return response;
      });
  }
  tokenToChangePassword(password, token) {
    return axios
      .post(this.APP_URL + "forgotPassword/" + token, {
        password,
      })
      .then((response) => {
        return response;
      });
  }
  verifyEmail(token) {
    return axios
      .get(this.APP_URL + "verify/email/" + token)
      .then((response) => {
        return response;
      });
  }
}

export default new AuthService();
