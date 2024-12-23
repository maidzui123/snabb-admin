import qs from 'qs';
import requests from './httpService';

const ReportServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/report-admin?${queryString ? queryString : ""}`
    );
  },
  
  getShowingAttributes: async () => {
    return requests.get(`/attributes/show`);
  },

  addOne: async (body) => {
    return requests.post("/report-admin/add", body);
  },

  addAll: async (body) => {
    return requests.post("/report-admin/all", body);
  },
  getReportById: async (id) => {
    return requests.get(`/report-admin/report/${id}`);
  },
  getById: async (id) => {
    return requests.get(`/report-admin/${id}`);
  },

  updateOne: async (id, body) => {
    return requests.post(`/report-admin/${id}`, body);
  },

  updateMany: async (body) => {
    return requests.post("report-admin/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.post(`/report-admin/status/${id}`, body);
  },

   deleteMany: async (body) => {
    return requests.post("/report-admin/delete/many", body);
  },

  deleteOne: async (id) => {
    return requests.post(`/report-admin/delete/${id}`);
  },
};

export default ReportServices;

