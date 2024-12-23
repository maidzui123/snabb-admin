import qs from 'qs';
import requests from './httpService';

const BrandServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/brand-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/brand-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/brand-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/brand-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/brand-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("brand-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/brand-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/brand-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/brand-admin/delete/${id}`);
  },
};

export default BrandServices;

