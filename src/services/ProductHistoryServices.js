import qs from 'qs';
import requests from './httpService';

const ProductHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/producthistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/producthistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/producthistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/producthistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/producthistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("producthistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/producthistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/producthistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/producthistory-admin/delete/${id}`);
  },
};

export default ProductHistoryServices;

