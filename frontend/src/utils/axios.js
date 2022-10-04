import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.baseURL = "/api";
// axios.defaults.baseURL = "http://j7a601.p.ssafy.io:9090/api";
export default axios;
