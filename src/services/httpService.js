import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};
