/* eslint-disable no-param-reassign */
import authAPI from '../../api/auth.api';
import router from '../../router';

const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const state = {
  user: userStorage,
  loading: false,
  message: null,
};

const getters = {
};

const mutations = {
  setUser(state, data) {
    state.user = data;
    localStorage.setItem('user', JSON.stringify(data));
  },
  clearUser(state) {
    localStorage.removeItem('user');
    state.user = userStorage;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  setMessage(state, data) {
    state.message = data;
  },
  clearMessage(state) {
    state.message = null;
  },
};

const actions = {
  login({ commit, dispatch }, data) {
    commit('setLoading', true);
    commit('clearMessage');
    if (!data.email) {
      commit('setLoading', false);
      commit('setMessage', { type: 'error', text: 'You haven\'t entered your email' });
    } else if (!data.password) {
      commit('setLoading', false);
      commit('setMessage', { type: 'error', text: 'You haven\'t entered your password' });
    } else {
      authAPI.login(data)
        .then((userFirebase) => {
          authAPI.getUser(userFirebase.uid)
            .then((user) => {
              commit('setLoading', false);
              commit('setUser', user.data);
              dispatch('navigation/sendToDashboard', user.data, { root: true });
            }).catch((err) => {
              console.log(err);
            });
        }).catch((err) => {
          commit('setLoading', false);
          commit('setMessage', { type: 'error', text: err.message });
        });
    }
  },
  logout({ commit }) {
    authAPI.logout()
      .then(() => {
        commit('clearUser');
        router.push({ path: '/' });
      }).catch((err) => {
        console.log(err);
      });
  },
  resetPassword({ commit }, data) {
    commit('setLoading', true);
    commit('clearMessage');
    if (!data.email) {
      commit('setLoading', false);
      commit('setMessage', { type: 'error', text: 'You haven\'t entered your email' });
    } else {
      authAPI.resetPassword(data)
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', { type: 'success', text: 'Directions for updating your password have been sent to your email address.' });
        }).catch((err) => {
          commit('setLoading', false);
          commit('setMessage', { type: 'error', text: err.message });
        });
    }
  },
  updateUser({ commit }, data) {
    authAPI.updateUser(data)
      .then(() => {
        commit('setUser', data);
      }).catch((err) => {
        console.log(err);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
