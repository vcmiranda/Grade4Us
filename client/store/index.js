import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth/store';
import layout from './modules/layout/store';
import validation from './modules/validation/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    layout,
    validation,
  },
});

export default store;
