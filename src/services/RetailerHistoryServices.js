import qs from 'qs';
import requests from './httpService';

const RetailerHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/retailerhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/retailerhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/retailerhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/retailerhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/retailerhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("retailerhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/retailerhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/retailerhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/retailerhistory-admin/delete/${id}`);
  },
};

export default RetailerHistoryServices;

