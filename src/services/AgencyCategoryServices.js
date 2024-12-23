import qs from 'qs';
import requests from './httpService';

const AgencyCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/agencycategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/agencycategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/agencycategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/agencycategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/agencycategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("agencycategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/agencycategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/agencycategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/agencycategory-admin/delete/${id}`);
  },
};

export default AgencyCategoryServices;

