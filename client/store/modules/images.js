/* eslint-disable no-param-reassign */
import imagesAPI from '../../api/images.api';

const state = {
  image: {},
};

const getters = {
};

const mutations = {
  setImages(state, data) {
    state.image = data;
  },
};

const actions = {
  getImageStudent({ commit }, data) {
    imagesAPI.getImageStudent(data)
      .then((ret) => {
        commit('setImages', ret.data);
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
