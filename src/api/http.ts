import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import useAppStore from '@/stores/appStore';
import { message } from 'ant-design-vue';
// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求发送前做一些处理，例如添加认证 token
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么，例如解包数据或统一处理错误码
    if (response.data.code !== 0) {

      const { data: { code, message: msg, action } } = response;

      if (action === 'toast' && code != 0 && msg) {
        message.error(msg);
      }

      if (code == 100001 || code == 100007 || code == 100008) {
        const userStoreInstance = useAppStore();

        userStoreInstance.logout()
      }
    }
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回了一个非 2xx 的响应
      console.error('Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // 请求已经发送，但没有收到响应
      console.error('Request Error:', error.request);
    } else {
      // 其他错误
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// 导出封装的请求方法
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstance.get(url, config).then(res => res);
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axiosInstance.post(url, data, config).then(res => res);
  },
  download<T = any>(url: string, data?: any, fileName = '工作日志'): Promise<AxiosResponse> {
    return axiosInstance.post(url, data, { responseType: 'blob' }).then((res: any) => {
      if (res) {
        try {
          // 直接使用 Blob
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          const downloadElement = document.createElement('a');
          document.body.appendChild(downloadElement);
          const objectUrl = URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          downloadElement.download = fileName + '.xlsx';
          downloadElement.click();
          document.body.removeChild(downloadElement);
          URL.revokeObjectURL(objectUrl);
        } catch (error) {
          console.log(`error`, error)
        }
      }
      return res;
    });
  }
};

export default http;
