import qs from 'qs';
import requests from './httpService';

const DistrictServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/district?${queryString ? queryString : ""}`
    );
  },

  getById: async (id) => {
    return requests.get(`/district/${id}`);
  },
};

export default DistrictServices;

