import qs from 'qs';
import requests from './httpService';

const AgencyServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/agency-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/agency-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/agency-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/agency-admin/${id}`);
  },

  getByCode: async (code) => {
    return requests.get(`/agency-admin/getByCode/${code}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/agency-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("agency-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/agency-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/agency-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/agency-admin/delete/${id}`);
  },
};

export default AgencyServices;

