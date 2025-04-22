const state = {
  token: localStorage.getItem("token") || "",
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  roles: JSON.parse(localStorage.getItem("roles") || "[]"),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    localStorage.setItem("token", token);
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
    localStorage.setItem("roles", JSON.stringify(roles));
  },
  CLEAR_AUTH: (state) => {
    state.token = "";
    state.userInfo = {};
    state.roles = [];
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("roles");
  },
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // 这里替换为实际的登录API调用
      // 模拟登录
      setTimeout(() => {
        if (
          userInfo.username === "admin" &&
          userInfo.password === "Admin123!"
        ) {
          const token = "mock-token-" + Math.random().toString(36).substr(2);
          const userInfo = {
            username: "admin",
            avatar:
              "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          };
          const roles = ["admin"];
          commit("SET_TOKEN", token);
          commit("SET_USER_INFO", userInfo);
          commit("SET_ROLES", roles);
          resolve();
        } else if (
          userInfo.username === "editor" &&
          userInfo.password === "Editor123!"
        ) {
          const token = "mock-token-" + Math.random().toString(36).substr(2);
          const userInfo = {
            username: "editor",
            avatar:
              "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          };
          const roles = ["editor"];
          commit("SET_TOKEN", token);
          commit("SET_USER_INFO", userInfo);
          commit("SET_ROLES", roles);
          resolve();
        } else {
          reject(new Error("用户名或密码错误"));
        }
      }, 500);
    });
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      // 模拟API调用
      setTimeout(() => {
        const roles = state.token.includes("admin") ? ["admin"] : ["editor"];
        commit("SET_ROLES", roles);
        resolve({ roles });
      }, 200);
    });
  },

  // 用户退出
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("CLEAR_AUTH");
      resolve();
    });
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  userInfo: (state) => state.userInfo,
  roles: (state) => state.roles,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
