import axiosInstance from "../api/axiosInstance";

export const getProducts = () => {
  return axiosInstance.get("/products");
};

export const getProduct = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

export const addProduct = (product) => {
  return axiosInstance.post("/products", product);
};

export const updateProduct = (id, product) => {
  return axiosInstance.put(`/products/${id}`, product);
};

export const deleteProduct = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};

export const getOrders = () => {
  return axiosInstance.get("/orders");
};

export const getOrder = (id) => {
  return axiosInstance.get(`/orders/${id}`);
};