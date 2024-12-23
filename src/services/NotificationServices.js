import qs from 'qs';
import requests from './httpService';

const NotificationServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/notification-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/notification-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/notification-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/notification-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/notification-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("notification-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/notification-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/notification-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/notification-admin/delete/${id}`);
  },
};

export default NotificationServices;

