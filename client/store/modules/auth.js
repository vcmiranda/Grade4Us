/* eslint-disable no-param-reassign */
import authAPI from '../../api/auth.api';
import router from '../../router';

const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const state = {
  user: userStorage,
  loading: false,
  error: null,
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
  setError(state, data) {
    state.error = data;
  },
  clearError(state) {
    state.error = null;
  },
};

const actions = {
  login({ commit, dispatch }, data) {
    commit('setLoading', true);
    commit('clearError');
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
        commit('setError', err);
      });
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
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
