import http from './http';

export default {
  addRecord: (params: any) => {
    return http.post('/record/addRecord', params);
  },
  updateRecord: (params: any) => {
    return http.post('/record/updateRecord', params);
  },
  getRecordList: (params: any) => {
    return http.post('/record/getRecordList', params);
  },

}