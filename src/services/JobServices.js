import qs from 'qs';
import requests from './httpService';

const JobServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/job-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/job-admin/add", body, { "Content-Type": "application/x-www-form-urlencoded" });
  },

  addAll: async (body) => {
    return requests.post("/job-admin/all", body);
  },

  agencyConfirm: async (id, body) => {
    return requests.post(`/job-admin/agencyconfirm/${id}`, body);
  },
  
  agencySelectAccessory: async (id, body) => {
    return requests.post(`/job-admin/agencyselectccessory/${id}`, body);
  },

  confirm: async (id, body) => {
    return requests.post(`/job-admin/confirm/${id}`, body);
  },

  getById: async (id) => {
    return requests.get(`/job-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/job-admin/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },
  updateToPublic: async (id, body) => {
    return requests.post(`/job-admin/updatepublic/${id}`, body, { "Content-Type": "application/x-www-form-urlencoded" });
  },
  updateMany: async (body) => {
    return requests.post("job-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/job-admin/status/${id}`, body);
  },

  deleteMany: async (body) => {
    return requests.post("/job-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/job-admin/delete/${id}`);
  },
};

export default JobServices;

