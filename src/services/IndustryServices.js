import qs from 'qs';
import requests from './httpService';

const IndustryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/industry-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/industry-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/industry-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/industry-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/industry-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("industry-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/industry-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/industry-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/industry-admin/delete/${id}`);
  },
};

export default IndustryServices;

