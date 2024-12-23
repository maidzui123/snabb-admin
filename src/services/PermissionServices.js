import qs from "qs";
import requests from "./httpService";

const PermissionServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(`/permission-admin?${queryString ? queryString : ""}`);
  },

  getShowingAttributes: async () => { 
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/permission-admin/add", body);
  },

  addMany: async (body) => {
    return requests.post("/permission-admin/add/many", body);
  },

  getById: async (id) => {
    return requests.get(`/permission-admin/${id}`);
  },
  getByModule: async () => {
    return requests.get(`/permission-admin/getby/module`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/permission-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("permission-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/permission-admin/status/${id}`, body);
  },

  deleteMany: async (body) => {
    return requests.post("/permission-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/permission-admin/delete/${id}`);
  },

  getPermission: async (body) => {
    return requests.post(`/permission-admin/check`, body);
  },
};

export default PermissionServices;
