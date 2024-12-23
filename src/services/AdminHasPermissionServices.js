import qs from 'qs';
import requests from './httpService';

const AdminHasPermissionServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/adminhaspermission-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/adminhaspermission-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/adminhaspermission-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/adminhaspermission-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/adminhaspermission-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("adminhaspermission-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/adminhaspermission-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/adminhaspermission-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/adminhaspermission-admin/delete/${id}`);
  },
};

export default AdminHasPermissionServices;

