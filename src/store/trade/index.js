import { reqGetUerAddress, reqOrderInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    addressList: [],
    orderInfo: {},
  },
  actions: {
    // 获取用户的地址信息
    async getUserAddressList({ commit }) {
      const res = await reqGetUerAddress();
      if (res.code === 200) {
        commit("GET_USER_ADDRESS_LIST", res.data);
        return "ok";
      } else {
        throw 'Fail';
      }
    },
    // 获取用户的订单信息（商品列表）
    async getOrders({ commit }) {
      const res = await reqOrderInfo();
      if (res.code === 200) {
        commit("GET_ORDER_Info", res.data);
        return "ok";
      } else {
        throw 'Fail';
      }
    }
  },
  mutations: {
    GET_USER_ADDRESS_LIST(state, value) {
      state.addressList = value;
    },
    GET_ORDER_Info(state, value) {
      state.orderInfo = value;
    }
  },
  getters: {
    detailArrayList(state) {
      return state.orderInfo.detailArrayList || [];
    }
  }
}