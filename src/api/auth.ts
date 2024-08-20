import http from './http';

export default {
  login: () => {
    http.post('/auth/login')
  }
}