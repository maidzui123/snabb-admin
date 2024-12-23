import qs from 'qs';
import requests from './httpService';

const LogServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/log-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/log-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/log-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/log-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/log-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("log-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/log-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/log-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/log-admin/delete/${id}`);
  },
};

export default LogServices;

