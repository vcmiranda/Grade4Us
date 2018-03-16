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
  // toggleLoginBtn(state) {
  //   state.loginBtn = !state.loginBtn;
  // },
  toggleLoginForm(state) {
    state.loginForm = !state.loginForm;
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
