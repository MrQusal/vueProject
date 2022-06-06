import { reqGoodInfo, reqAddOrUpdateShopCart } from '@/api/index'
import { getUUID } from '@/utils/uuid_token'

export default {
  namespaced: true,
  state: {
    goodDetails: {},
    // 临时游客的身份信息
    uuid_token: getUUID()
  },
  mutations: {
    GET_GOOD_DETAILS(state, value) {
      state.goodDetails = value;
    }
  },
  actions: {
    async getGoodDetails({ commit }, skuId) {
      const res = await reqGoodInfo(skuId);
      if (res.code === 200) {
        commit("GET_GOOD_DETAILS", res.data);
      }
    },
    async addGoodtoShopCart(_, { skuId, skuNum }) {
      const res = await reqAddOrUpdateShopCart(skuId, skuNum);
      // 200 表示，服务器添加到数据库成功，返回的 data 为 null
      if (res.code === 200) {
        return res;
      } else {
        throw Error("fail");
      }
    }
  },
  getters: {
    categoryView(state) {
      return state.goodDetails.categoryView || {};
    },
    skuInfo(state) {
      return state.goodDetails.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodDetails.spuSaleAttrList || [];
    }
  }
}