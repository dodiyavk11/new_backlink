import axios from "axios";
const APP_URL = "http://localhost:3000/";
class ApiCall {  
  addUserProject(formData)
  {
    const authToken = localStorage.getItem('token');
    return axios.post(
        APP_URL + "user/project",
        formData,
        {
          headers: { 'Authorization': `Bearer ${authToken}` },
        })
        .then((response) =>{
            return response;
        });      
  }
}

export default new ApiCall();
