import qs from 'qs';
import requests from './httpService';

const AccessoryCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/accessorycategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/accessorycategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/accessorycategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/accessorycategory-admin/${id}`);
  },

  getByCode: async (code) => {
    return requests.get(`/accessorycategory-admin/getByCode/${code}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/accessorycategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("accessorycategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/accessorycategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/accessorycategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/accessorycategory-admin/delete/${id}`);
  },
};

export default AccessoryCategoryServices;

