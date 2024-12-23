import qs from 'qs';
import requests from './httpService';

const PolicyServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/policy-admin?${queryString ? queryString : ""}`
    );
  },

  getAllByLegalID: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/policy-admin/allbylegalid?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/policy-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/policy-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/policy-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/policy-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("policy-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/policy-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/policy-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/policy-admin/delete/${id}`);
  },
};

export default PolicyServices;

