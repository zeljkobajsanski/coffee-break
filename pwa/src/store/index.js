import Vue from "vue";
import Vuex from "vuex";
import * as Msal from "msal";
import axios from "axios";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    users: [],
    isOpen: false,
    authenticatedUser: {}
  },
  mutations: {
    setAuthenticated(state, authenticatedUser) {
      state.authenticatedUser = authenticatedUser;
      state.isAuthenticated = !!authenticatedUser;
    },
    SOCKET_USERS(state, users) {
      state.users = users;
    },
    SOCKET_CLOSE(state) {
      state.users = [];
      state.isOpen = false;
    },
    setOpen(state, isOpen) {
      state.isOpen = isOpen;
    }
  },
  actions: {
    async login({ commit }) {
      const authClient = new Msal.UserAgentApplication({
        auth: {
          clientId: process.env.VUE_APP_CLIENT_ID, //This is your client ID
          authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`, //This is your tenant info
          redirectUri: process.env.VUE_APP_REDIRECT_URI //This is your redirect URI
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: true
        }
      });

      try {
        const request = { scopes: ["user.read"] };
        await authClient.loginPopup(request);
        const tokenResponse = await authClient.acquireTokenSilent(request);
        const { data } = await axios.post(`api/authentication/login/`, {
          accessToken: tokenResponse.accessToken
        });
        axios.defaults.headers = {
          Authorization: `Bearer ${data.accessToken}`
        };
        localStorage.setItem("token", data.accessToken);
        const userInfo = jwt_decode(data.accessToken);
        localStorage.setItem("user", JSON.stringify(userInfo));
        commit("setAuthenticated", userInfo);
        return true;
      } catch (e) {
        return false;
      }
    },
    async loadUsers({ commit }) {
      const { data: users } = await axios.get("/api/coffee-shop/users");
      commit("SOCKET_USERS", users);
    }
  },
  modules: {}
});
