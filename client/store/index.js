import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import images from './modules/images';
import layout from './modules/layout';
import navigation from './modules/navigation';
import validation from './modules/validation';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    images,
    layout,
    navigation,
    validation,
  },
});

export default store;
