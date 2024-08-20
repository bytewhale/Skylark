import http from './http';

export default {
  getUserInfo: (params: any) => {
    return http.post('/user/getUserInfo', params);
  }
}