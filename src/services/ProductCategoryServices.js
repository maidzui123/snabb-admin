import qs from 'qs';
import requests from './httpService';

const ProductCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/productcategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/productcategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/productcategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/productcategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/productcategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("productcategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/productcategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/productcategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/productcategory-admin/delete/${id}`);
  },
};

export default ProductCategoryServices;

