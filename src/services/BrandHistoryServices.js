import qs from 'qs';
import requests from './httpService';

const BrandHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/brandhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/brandhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/brandhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/brandhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/brandhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("brandhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/brandhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/brandhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/brandhistory-admin/delete/${id}`);
  },
};

export default BrandHistoryServices;

