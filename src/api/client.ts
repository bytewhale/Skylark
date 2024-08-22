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

}