import qs from 'qs';
import requests from './httpService';

const AdminActivityServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/adminactivity-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/adminactivity-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/adminactivity-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/adminactivity-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/adminactivity-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("adminactivity-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/adminactivity-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/adminactivity-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/adminactivity-admin/delete/${id}`);
  },
};

export default AdminActivityServices;

