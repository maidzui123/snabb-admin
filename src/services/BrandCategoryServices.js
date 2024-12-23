import qs from 'qs';
import requests from './httpService';

const BrandCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/brandcategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/brandcategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/brandcategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/brandcategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/brandcategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("brandcategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/brandcategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/brandcategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/brandcategory-admin/delete/${id}`);
  },
};

export default BrandCategoryServices;

