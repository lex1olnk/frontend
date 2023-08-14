import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api/'
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api/'
});

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

const getContentJsonType = () => {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

const getContentFileType = () => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost, getContentFileType, getContentJsonType };
