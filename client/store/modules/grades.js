/* eslint-disable no-param-reassign */
import gradesAPI from '../../api/grades.api';

const state = {
  grades: [],
};

const getters = {
};

const mutations = {
  setGrades(state, data) {
    state.grades = data;
  },
};

const actions = {
  listGrade({ commit }, data) {
    gradesAPI.listGrade(data)
      .then((ret) => {
        commit('setGrades', ret.data);
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
