import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './assets/css/main.css';
import Firebase from './scripts/firebase';
import App from './view/App.vue';
import router from './router/index';
import store from './store/index';
import PictureInput from 'vue-picture-input';

Vue.use(
  Vuetify,
  {
    theme: {
      primary: '#3878c2',
      secondary: '#8049A7',
      accent: '#E57500',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',
    },
  },
);
Vue.use(Firebase);

Vue.component('pictureInput', PictureInput);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
