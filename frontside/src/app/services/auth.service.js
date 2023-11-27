import axios from "axios";
const APP_URL = "http://localhost:3000/";
// const APP_URL = "http://fairlinked.bestprojectmanagementtool.com/backend/";
class AuthService {
  login(email, password) {
    return axios
      .post(APP_URL + "signin", {
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
    return axios.post(APP_URL + "signup", formData);
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
    return axios.get(APP_URL + "contentlinks/" + hash_id, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  getCartData() {
    const authToken = localStorage.getItem("token");
    return axios.get(APP_URL + "user/cart", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
  forgotPasswordLinkGenerate(email) {
    return axios
      .post(APP_URL + "ForgotPasswordLink", {
        email,
      })
      .then((response) => {
        return response;
      });
  }
  tokenToChangePassword(password, token) {
    return axios
      .post(APP_URL + "forgotPassword/" + token, {
        password,
      })
      .then((response) => {
        return response;
      });
  }
  verifyEmail(token) {
    return axios
      .get(APP_URL + "verify/email/" + token)
      .then((response) => {
        return response;
      });
  }
}

export default new AuthService();
