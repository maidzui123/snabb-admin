import qs from 'qs';
import requests from './httpService';

const JobActivityServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/jobactivity-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/jobactivity-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/jobactivity-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/jobactivity-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/jobactivity-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("jobactivity-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/jobactivity-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/jobactivity-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/jobactivity-admin/delete/${id}`);
  },
};

export default JobActivityServices;

