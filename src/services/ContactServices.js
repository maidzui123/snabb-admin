import qs from 'qs';
import requests from './httpService';

const ContactServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/contact-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/contact-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/contact-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/contact-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/contact-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("contact-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/contact-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/contact-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/contact-admin/delete/${id}`);
  },
};

export default ContactServices;

