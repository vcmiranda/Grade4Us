/* eslint-disable no-param-reassign */

const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const state = {
  drawer: true,
  loginBtn: userStorage === null,
  profile: false,
};

const getters = {
};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  closeDrawer(state) {
    state.drawer = false;
  },
  showLoginBtn(state) {
    state.loginBtn = true;
  },
  hideLoginBtn(state) {
    state.loginBtn = false;
  },
  toggleProfile(state) {
    state.profile = !state.profile;
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
