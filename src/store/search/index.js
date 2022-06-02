import { reqSearchData } from '@/api/index'

export default {
  namespaced: true,
  state: {
    searchData: {}
  },
  mutations: {
    GET_SEARCH_DATA(state, value) {
      state.searchData = value;
    }
  },
  actions: {
    async getSearchData({ commit }, params = {}) {
      const res = await reqSearchData(params);
      if (res.code === 200) {
        commit("GET_SEARCH_DATA", res.data);
      }
    }
  },
  // 简化数据
  getters: {
    goodsList(state) {
      // [] 防止undefined
      return state.searchData.goodsList || [];
    },
    attrsList(state) {
      return state.searchData.attrsList || [];
    },
    trademarkList(state) {
      return state.searchData.trademarkList || [];
    },
    total(state) {
      return state.searchData.total;
    }
  }
}