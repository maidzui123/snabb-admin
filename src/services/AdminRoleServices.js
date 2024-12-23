import qs from 'qs';
import requests from './httpService';

const AdminRoleServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/adminrole-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/adminrole-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/adminrole-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/adminrole-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/adminrole-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("adminrole-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/adminrole-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/adminrole-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/adminrole-admin/delete/${id}`);
  },
};

export default AdminRoleServices;

