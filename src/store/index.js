import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    token: null,
    loginTime: null,
  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.user = payload.user;
      state.token = payload.token;
      state.loginTime = Date.now();

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
      localStorage.setItem("loginTime", state.loginTime);
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      state.token = null;
      state.loginTime = null;

      localStorage.clear();
    },
    restoreLoginState(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const loginTime = parseInt(localStorage.getItem("loginTime"), 10);

      if (user && token && loginTime) {
        state.isLogin = true;
        state.user = user;
        state.token = token;
        state.loginTime = loginTime;
      }
    },
  },
  actions: {},
  modules: {},
});
