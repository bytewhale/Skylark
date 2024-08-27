import http from './http';

export default {
  addCase: (params: any) => {
    return http.post('/case/addCase', params);
  },
  updateCase: (params: any) => {
    return http.post('/case/updateCase', params);
  },
  getCaseList: (params: any) => {
    return http.post('/case/getCaseList', params);
  },
  getCasesByClientId: (params: any) => {
    return http.post('/case/getCasesByClientId', params);
  },
}