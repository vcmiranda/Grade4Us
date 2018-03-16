import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import Firebase from './scripts/firebase';
import App from './view/App.vue';
import router from './router/index';
import store from './store/index';

Vue.use(
  Vuetify,
  {
    theme: {
      primary: '#424242',
      secondary: '#ee44aa',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',
    },
  },
);
Vue.use(Firebase);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
