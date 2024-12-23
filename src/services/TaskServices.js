import qs from 'qs';
import requests from './httpService';

const TaskServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/task-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/task-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/task-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/task-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/task-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("task-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/task-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/task-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/task-admin/delete/${id}`);
  },
};

export default TaskServices;

