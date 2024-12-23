import qs from 'qs';
import requests from './httpService';

const ProviderHistoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/providerhistory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/providerhistory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/providerhistory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/providerhistory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/providerhistory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("providerhistory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/providerhistory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/providerhistory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/providerhistory-admin/delete/${id}`);
  },
};

export default ProviderHistoryServices;

