import http from './http';

export default {
  addClient: (params: any) => {
    return http.post('/client/addClient', params);
  },
  updateClient: (params: any) => {
    return http.post('/client/updateClient', params);
  },
  getClientList: (params: any) => {
    return http.post('/client/getClientList', params);
  },
  getClientDetail: (params: any) => {
    return http.post('/client/getClientDetail', params);
  },
  getClientConfigList: (params: any) => {
    return http.get('/client/getClientConfigList', params);
  },
}