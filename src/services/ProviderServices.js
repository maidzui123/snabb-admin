import qs from 'qs';
import requests from './httpService';

const ProviderServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/provider-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/provider-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/provider-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/provider-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/provider-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("provider-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/provider-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/provider-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/provider-admin/delete/${id}`);
  },
};

export default ProviderServices;

