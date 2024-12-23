import qs from 'qs';
import requests from './httpService';

const ClientServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/client-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/client-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/client-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/client-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/client-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("client-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/client-admin/status/${id}`, body);
  },

  deleteMany: async (body) => {
    return requests.post("/client-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/client-admin/delete/${id}`);
  },

  getByLegalId: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/client-admin/search-by-legal-id?${queryString ? queryString : ""}`
    );
  },
};

export default ClientServices;

