/* eslint-disable no-param-reassign */
import authAPI from '../../../api/auth.api';
import router from '../../../router';

const state = {
  user: null,
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
  clearUser(state, data) {
    state.user = data;
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
  login({ commit }, data) {
    commit('setLoading', true);
    commit('clearError');
    authAPI.login(data)
      .then((userFirebase) => {
        authAPI.getUser(userFirebase.uid)
          .then((user) => {
            commit('setLoading', false);
            commit('setUser', user.data);
            if (user.data.admin_id) {
              router.push({ path: '/dashboard/admin/' });
            } else if (user.data.teacher_id) {
              router.push({ path: '/dashboard/teacher/' });
            } else {
              router.push({ path: '/dashboard/parent/' });
            }
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
        commit('clearUser', '');
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
