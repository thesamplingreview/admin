import Qs from 'qs';
import axios from 'axios';
import config from '@/config/app';

const instance = axios.create({
  baseURL: config.apiUrl,
  paramsSerializer: (params) => (Qs.stringify(params, { arrayFormat: 'indices' })),
});

export default instance;
