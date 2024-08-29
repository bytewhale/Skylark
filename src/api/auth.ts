import http from './http';

export default {
  login: (params: any) => {
    return http.post('/auth/login', params);
  },
  register: (params: any) => {
    return http.post('/auth/register', params);
  },
  refreshToken: (params: any) => {
    return http.post('/auth/refreshToken', params);
  },
}