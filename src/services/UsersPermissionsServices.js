import qs from 'qs';
import requests from './httpService';

const UsersPermissionsServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/users_permissions-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/users_permissions-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/users_permissions-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/users_permissions-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/users_permissions-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("users_permissions-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/users_permissions-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/users_permissions-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/users_permissions-admin/delete/${id}`);
  },
};

export default UsersPermissionsServices;

