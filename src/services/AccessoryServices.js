import qs from 'qs';
import requests from './httpService';

const AccessoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/accessory-admin?${queryString ? queryString : ""}`
    );
  },

  getAllByAgency: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/accessory-admin/allbyagency?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/accessory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/accessory-admin/add/all", body);
  },

  getById: async (id) => {
    return requests.get(`/accessory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/accessory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("accessory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/accessory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/accessory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/accessory-admin/delete/${id}`);
  },
};

export default AccessoryServices;

