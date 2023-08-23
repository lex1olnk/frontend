import axios, { AxiosRequestConfig } from 'axios';

const authorization =  `Bearer ${localStorage.getItem('token')}`;

export const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api/v1/'
});

export const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api/v1/',
  headers: {
    Authorization: authorization
  }
});

export const getContentJsonType = () => {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export const getContentFileType = () => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
};

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const getAxiosBody = (obj: Object) => JSON.stringify(obj);

