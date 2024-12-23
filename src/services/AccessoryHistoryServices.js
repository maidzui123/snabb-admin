import qs from 'qs';
import requests from './httpService';

const AccessoryHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/accessoryhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/accessoryhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/accessoryhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/accessoryhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/accessoryhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("accessoryhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/accessoryhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/accessoryhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/accessoryhistory-admin/delete/${id}`);
  },
};

export default AccessoryHistoryServices;

