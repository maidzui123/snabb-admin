import qs from 'qs';
import requests from './httpService';

const ClientContractServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/clientcontract-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/clientcontract-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/clientcontract-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/clientcontract-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/clientcontract-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("clientcontract-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/clientcontract-admin/status/${id}`, body);
  },

  deleteMany: async (body) => {
    return requests.post("/clientcontract-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/clientcontract-admin/delete/${id}`);
  },

  getByClientId: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/clientcontract-admin/get-by-client-id?${queryString ? queryString : ""}`
    );
  },
};

export default ClientContractServices;

