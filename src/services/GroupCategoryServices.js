import qs from 'qs';
import requests from './httpService';

const GroupCategoryServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/groupcategory-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/groupcategory-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/groupcategory-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/groupcategory-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/groupcategory-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("groupcategory-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/groupcategory-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/groupcategory-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/groupcategory-admin/delete/${id}`);
  },
};

export default GroupCategoryServices;

