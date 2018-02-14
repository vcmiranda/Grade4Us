/* eslint-disable no-param-reassign */

import groupAPI from '../../../api/group.api';

const state = {
  groupList: null,
  loading: null,
};

const getters = {
  byId: state => id => state.groupList[id],
};

const actions = {
  create() {
    groupAPI.create().then(() => {
      // returned data
    }).catch(() => {
      // handle error
    });
  },
  get() {
    groupAPI.get().then(() => {
      // returned data
    }).catch(() => {
      // handle error
    });
  },
  update() {
    groupAPI.update().then(() => {
      // returned data
    }).catch(() => {
      // handle error
    });
  },
  delete() {
    groupAPI.delete().then(() => {
      // returned data
    }).catch(() => {
      // handle error
    });
  },
};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
