import axios from 'axios';
import router from '../router'
import {
  Toast
} from 'vant';
const  token = localStorage.getItem('token') || '';
const request = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://backend-api-01.newbee.ltd/api/v1' : 'http://backend-api-01.newbee.ltd/api/v1',
  timeout: 1000,
  withCredentials: true,
  headers: {
    token,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});
// 响应拦截器
request.interceptors.response.use(res => {
  if (typeof res.data !== "object") {
    Toast.fail("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) Toast.fail(res.data.message);
    if (res.data.resultCode == 416) {
      router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

export default request