/* eslint-disable no-param-reassign */

// import layoutAPI from '../../../api/layout.api';

const state = {
  drawer: true,
};

const getters = {

};

const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
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
