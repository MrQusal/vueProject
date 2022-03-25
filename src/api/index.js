// 对接口API进行统一管理

import requests from './request';

// 
/*
  三级联动接口
  查看文档：/api/product/getBaseCategoryList  get请求 无参数
  注意：/api在 baseUrl 处加上了，这里发送时不用书写
  axios 发请求，返回的结果是 promise 对象
*/

export const reqCatagoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'GET' })

