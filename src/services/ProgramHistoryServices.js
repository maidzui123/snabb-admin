import qs from 'qs';
import requests from './httpService';

const ProgramHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/programhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/programhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/programhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/programhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/programhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("programhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/programhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/programhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/programhistory-admin/delete/${id}`);
  },
};

export default ProgramHistoryServices;

