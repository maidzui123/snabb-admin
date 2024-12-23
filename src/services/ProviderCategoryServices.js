import qs from 'qs';
import requests from './httpService';

const ProviderCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/providercategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/providercategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/providercategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/providercategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/providercategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("providercategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/providercategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/providercategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/providercategory-admin/delete/${id}`);
  },
};

export default ProviderCategoryServices;

