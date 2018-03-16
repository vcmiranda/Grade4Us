/* eslint-disable no-param-reassign */

const state = {
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  ],
};

const getters = {

};

const mutations = {

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
