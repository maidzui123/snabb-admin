import qs from 'qs';
import requests from './httpService';

const RoleServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/role-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/role-admin/add", body);
  },
  upsert: async (body) => {
    return requests.post("/role-admin/add/upsert", body);
  },

  addAll: async (body) => {
    return requests.post("/role-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/role-admin/${id}`);
  },

  getPermissionsByRoles: async (id) => {
    return requests.get(`/role-admin/getpermissions/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/role-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("role-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/role-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/role-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/role-admin/delete/${id}`);
  },
};

export default RoleServices;

