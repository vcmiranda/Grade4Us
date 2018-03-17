/* eslint-disable no-param-reassign */

// import layoutAPI from '../../../api/layout.api';

const state = {
  drawer: true,
  loginBtn: true,
  loginForm: false,
};

const getters = {
};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  showLoginForm(state) {
    state.loginForm = true;
  },
  hideLoginForm(state) {
    state.loginForm = false;
  },
  showLoginBtn(state) {
    state.loginBtn = true;
    localStorage.setItem('loginBtn', true);
  },
  hideLoginBtn(state) {
    state.loginBtn = false;
    localStorage.setItem('loginBtn', false);
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
