import qs from 'qs';
import requests from './httpService';

const ImportHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/importhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/importhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/importhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/importhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/importhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("importhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/importhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/importhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/importhistory-admin/delete/${id}`);
  },
};

export default ImportHistoryServices;

