// 对 axios 进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 引入样式
import "nprogress/nprogress.css"
// start() 表开始、done() 表结束

const requests = axios.create({
  // 在路径后加上 api
  baseURL: "/api", 
  // 超时事件 5ms
  timeout: 5000
})

// 配置请求拦截器
requests.interceptors.request.use((config) => {
  // config 配置对象，有很重要的属性 headers
  nprogress.start();  // 进度条开始
  return config;
})

// 配置相应拦截器
requests.interceptors.response.use((response) => {
  // 直接将 data 对象 返回
  nprogress.done()  // 进度条结束
  return response.data;
}, (error) => {
  // 终止 promise 链
  return Promise.reject(error);
})

export default requests;