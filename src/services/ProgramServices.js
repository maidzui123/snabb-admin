import qs from 'qs';
import requests from './httpService';

const ProgramServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/program-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/program-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/program-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/program-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/program-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("program-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/program-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/program-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/program-admin/delete/${id}`);
  },
};

export default ProgramServices;

