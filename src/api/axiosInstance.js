import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://product-order-dashboard-1.onrender.com"
});

export default axiosInstance;