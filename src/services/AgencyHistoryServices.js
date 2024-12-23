import qs from 'qs';
import requests from './httpService';

const AgencyHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/agencyhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/agencyhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/agencyhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/agencyhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/agencyhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("agencyhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/agencyhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/agencyhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/agencyhistory-admin/delete/${id}`);
  },
};

export default AgencyHistoryServices;

