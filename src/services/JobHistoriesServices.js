import qs from 'qs';
import requests from './httpService';

const JobHistoriesServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/jobhistories-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/jobhistories-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/jobhistories-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/jobhistories-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/jobhistories-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("jobhistories-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/jobhistories-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/jobhistories-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/jobhistories-admin/delete/${id}`);
  },
};

export default JobHistoriesServices;

