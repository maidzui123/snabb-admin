import qs from 'qs';
import requests from './httpService';

const UserServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/user-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/user-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/user-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/user-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/user-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("user-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/user-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/user-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/user-admin/delete/${id}`);
  },
};

export default UserServices;

