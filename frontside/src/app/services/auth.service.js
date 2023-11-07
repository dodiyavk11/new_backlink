import axios from "axios";
const APP_URL = "http://localhost:3000/";
const authToken = localStorage.getItem('token');
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
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
        }
        return response;
      });
  }

  SignUp(formData){
    return axios.post(APP_URL + 'signup', formData);
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.setItem("isLoggedIn", false);
  }

  getDashboard()
  {    
    const authToken = localStorage.getItem('token')
    return axios.get(APP_URL + 'user/dashboard',{
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
  }

  getContentLinksData(hash_id)
  {
    const authToken = localStorage.getItem('token')
    return axios.get(APP_URL + 'contentlinks/'+hash_id,{
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
  }
  getCartData()
  {
    return axios.get(APP_URL + 'user/cart',{
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
  }
}

export default new AuthService();
