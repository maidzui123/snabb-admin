import qs from 'qs';
import requests from './httpService';

const CityServices = {
  getAll: async (query) => {
    const queryString = query && qs.stringify(query, { encode: false });

    return requests.get(
      `/city?${queryString ? queryString : ""}`
    );
  },

  getById: async (id) => {
    return requests.get(`/city/${id}`);
  },
};

export default CityServices;

