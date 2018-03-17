/* eslint-disable no-param-reassign */
import router from '../../router';

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  sendToDashboard(user) {
    if (user.admin_id) {
      router.push({ path: '/dashboard/admin/' });
    } else if (user.teacher_id) {
      router.push({ path: '/dashboard/teacher/' });
    } else {
      router.push({ path: '/dashboard/parent/' });
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
