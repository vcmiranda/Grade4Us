/* eslint-disable no-param-reassign */
import imagesAPI from '../../api/images.api';

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  getImageURLStudent({ commit }, data) {
    return new Promise((success, error) => {
      imagesAPI.getImageURLStudent(data)
        .then((ret) => {
          success(ret.data);
        }).catch(error);
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
