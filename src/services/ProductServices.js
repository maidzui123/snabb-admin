import qs from 'qs';
import requests from './httpService';

const ProductServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/product-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/product-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/product-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/product-admin/${id}`);
  },

  getByCode: async (code) => {
    return requests.get(`/product-admin/getByCode/${code}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/product-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("product-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/product-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/product-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/product-admin/delete/${id}`);
  },
};

export default ProductServices;

