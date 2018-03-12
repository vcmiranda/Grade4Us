/* eslint-disable no-param-reassign */
import authAPI from '../../../api/auth.api';
import router from '../../../router';

const state = {
  user: null,
  loading: null,
};

const getters = {

};

const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  clearUser(state, data) {
    state.user = data;
  },
};

const actions = {
  login({ commit }, data) {
    authAPI.login(data)
      .then((userFirebase) => {
        authAPI.getUser(userFirebase.uid)
          .then((user) => {
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
        console.log(err);
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
