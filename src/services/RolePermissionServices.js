import qs from 'qs';
import requests from './httpService';

const RolePermissionServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/rolepermission-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/rolepermission-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/rolepermission-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/rolepermission-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/rolepermission-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("rolepermission-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/rolepermission-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/rolepermission-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/rolepermission-admin/delete/${id}`);
  },
};

export default RolePermissionServices;

