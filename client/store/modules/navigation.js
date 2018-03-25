/* eslint-disable no-param-reassign */
import router from '../../router';

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  sendToDashboard({ state }, user) {
    if (user.admin_id) {
      router.push({ path: '/dashboard/admin/' });
    } else if (user.teacher_id) {
      router.push({ path: '/dashboard/teacher/' });
    } else if (user.parent_id) {
      router.push({ path: '/dashboard/parent/' });
    } else {
      router.push({ path: '/' });
    }
  },
  sendToHome() {
    router.push({ path: '/' });
  },
  sendToLogin() {
    router.push({ path: '/login' });
  },
  sendToReset() {
    router.push({ path: '/reset' });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
