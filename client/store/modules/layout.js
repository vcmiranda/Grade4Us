/* eslint-disable no-param-reassign */

const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const state = {
  drawer: true,
  loginBtn: userStorage === null,
};

const getters = {
};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  showLoginBtn(state) {
    state.loginBtn = true;
  },
  hideLoginBtn(state) {
    state.loginBtn = false;
  },
};

const actions = {

};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
