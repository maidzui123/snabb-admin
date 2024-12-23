import qs from 'qs';
import requests from './httpService';

const ModuleServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/module-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/module-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/module-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/module-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/module-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("module-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/module-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/module-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/module-admin/delete/${id}`);
  },
};

export default ModuleServices;

