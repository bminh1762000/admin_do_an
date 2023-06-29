import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}users/all-users`);

  return response.data.users;
};

const updateUser = async (userData) => {
  const response = await axios.put(
    `${base_url}users/${userData.userId}`,
    userData
  );
  return response.data;
};

const customerService = {
  getUsers,
  updateUser,
};

export default customerService;
