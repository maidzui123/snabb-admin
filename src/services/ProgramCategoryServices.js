import qs from 'qs';
import requests from './httpService';

const ProgramCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/programcategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/programcategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/programcategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/programcategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/programcategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("programcategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/programcategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/programcategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/programcategory-admin/delete/${id}`);
  },
};

export default ProgramCategoryServices;

