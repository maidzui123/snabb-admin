import qs from 'qs';
import requests from './httpService';

const RetailerCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/retailercategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/retailercategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/retailercategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/retailercategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/retailercategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("retailercategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/retailercategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/retailercategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/retailercategory-admin/delete/${id}`);
  },
};

export default RetailerCategoryServices;

