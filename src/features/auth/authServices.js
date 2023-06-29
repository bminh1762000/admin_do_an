import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login-admin`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}orders/all-orders`, config);

  return response.data.orders;
};
const getOrder = async (id) => {
  const response = await axios.get(`${base_url}orders/${id}`, config);

  return response.data.order;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
