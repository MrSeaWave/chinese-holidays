import axios from 'axios';
import { BASE_URL } from './config';

const request = (url, data, method = 'get') => {
  const requestUrl = BASE_URL + url;
  const options = {
    method,
    url: requestUrl
  };
  if (method !== 'get') {
    options.data = data;
  } else {
    options.params = data;
  }
  return axios(options).then((resp) => ({ success: true, data: resp.data }));
};

export const getMethod = ({ url, data }) => request(url, data, 'get');
