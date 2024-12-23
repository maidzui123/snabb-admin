import qs from 'qs';
import requests from './httpService';

const RetailerServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/retailer-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/retailer-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/retailer-admin/add/all", body);
  },

  getById: async (id) => {
    return requests.get(`/retailer-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/retailer-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("retailer-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/retailer-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/retailer-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/retailer-admin/delete/${id}`);
  },
};

export default RetailerServices;

