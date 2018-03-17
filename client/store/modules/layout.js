/* eslint-disable no-param-reassign */

// import layoutAPI from '../../../api/layout.api';

const state = {
  drawer: true,
  loginBtn: true,
  userForm: 0,
};

const getters = {
};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  hideUserFormLogin(state) {
    state.userForm = 0;
  },
  showUserFormLogin(state) {
    state.userForm = 1;
  },
  showUserFormReset(state) {
    state.userForm = 2;
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
