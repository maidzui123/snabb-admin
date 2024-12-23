import qs from 'qs';
import requests from './httpService';

const RoleHasPermissionServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/rolehaspermission-admin?${queryString ? queryString : ""}`
    );
  },

  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/rolehaspermission-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/rolehaspermission-admin/all", body);
  },

  getById: async (id) => {
    return requests.get(`/rolehaspermission-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/rolehaspermission-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("rolehaspermission-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/rolehaspermission-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/rolehaspermission-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/rolehaspermission-admin/delete/${id}`);
  },
};

export default RoleHasPermissionServices;

