import requests from "./httpService";

const DashboardServices = {
  getDashboardNumber: async (body) => {
    return requests.post(`/dashboard-admin/number`, body);
  },
  getDashboardPolicyByProduct: async (body) => {
    return requests.post(`/dashboard-admin/chart`, body);
  },
};



export default DashboardServices;
