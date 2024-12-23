import qs from 'qs';
import requests from './httpService';

const WardServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/ward?${queryString ? queryString : ""}`
    );
  },

  getById: async (id) => {
    return requests.get(`/ward/${id}`);
  },
};

export default WardServices;

