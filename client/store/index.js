import Vue from 'vue';
import Vuex from 'vuex';

import group from './modules/group/store';
import groupFormCreate from './modules/group/form.create';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    group,
    groupFormCreate,
  },
});

export default store;
