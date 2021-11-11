import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// const token = localStorage.getItem('token');

// if(token){
//   axios.defaults.headers.common['Authorization'] = (`Bearer + ${token}`);
// }

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};
