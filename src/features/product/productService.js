import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}products/`);

  return response.data.products;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}products/`, product, config);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}products/${id}`, config);

  return response.data;
};

const updateProduct = async (id, product) => {
  const response = await axios.put(
    `${base_url}products/${id}`,
    product,
    config
  );
  return response.data;
};

const getProductDetail = async (id) => {
  const response = await axios.get(`${base_url}products/${id}`, config);
  return response.data.product;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail,
};

export default productService;
