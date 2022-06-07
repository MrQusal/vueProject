import { reqGetVerificationCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogOut } from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/token'
export default {
  namespaced: true,
  state: {
    code: "",
    token: getToken(),
    userInfo: {}
  },
  actions: {
    // 获取验证码
    async getCode({ commit }, phone) {
      // 获取验证码，正常情况是发到手机上，此接口把验证码返回了
      const res = await reqGetVerificationCode(phone);
      if (res.code === 200) {
        commit("GET_CODE", res.data);
      } else {
        throw "Fail";
      }
    },
    // 用户注册
    async userRegister(_, userInfo) {
      const res = await reqUserRegister(userInfo);
      if (res.code === 200) {
        return "ok";
      } else {
        throw res.message;
      }
    },
    //  用户登录
    async userLogin({ commit }, userFrom) {
      const res = await reqUserLogin(userFrom);
      if (res.code === 200) {
        commit("USER_LOGIN", res.data.token);
        // 持久化存储 token
        setToken(res.data.token);
      } else {
        throw data.message;
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const res = await reqGetUserInfo();
      if (res.code === 200) {
        commit("GET_USERINFO", res.data);
        return "ok";
      } else {
        throw "Fail";
      }
    },
    // 退出登录
    async userLogOut({ commit }) {
      // 通知服务器清除数据
      const res = await reqLogOut();
      if (res.code === 200) {
        commit("USER_LOGOUT")
        return "ok";
      } else {
        throw "Fail";
      }
    }
  },
  mutations: {
    GET_CODE(state, value) {
      state.code = value;
    },
    USER_LOGIN(state, value) {
      state.token = value;
    },
    GET_USERINFO(state, value) {
      state.userInfo = value;
    },
    USER_LOGOUT(state) {
      // 清除仓库数据
      state.userInfo = {};
      state.token = "";
      // 清除本地存储 token
      removeToken();
    }
  },
  getters: {
    loginName(state) {
      return state.userInfo.loginName;
    }
  }
}