import qs from 'qs';
import requests from './httpService';

const UsersRoleServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/users_role-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/users_role-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/users_role-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/users_role-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/users_role-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("users_role-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/users_role-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/users_role-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/users_role-admin/delete/${id}`);
  },
};

export default UsersRoleServices;

