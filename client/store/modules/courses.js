/* eslint-disable no-param-reassign */
import coursesAPI from '../../api/courses.api';

const state = {
  courses: [],
};

const getters = {
};

const mutations = {
  setCourse(state, data) {
    state.courses = data;
  },
};

const actions = {
  listCourse({ commit }, data) {
    coursesAPI.listCourse(data)
      .then((ret) => {
        commit('setCourse', ret.data);
      }).catch((err) => {
        console.log(err);
      });
  },
  updateCourse({ commit }, data) {
    coursesAPI.updateCourse(data)
      .then((ret) => {
        commit('setCourse', ret.data);
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
