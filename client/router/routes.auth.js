// Auth Pages
import Login from '../view/public/auth/login.vue';
import Reset from '../view/public/auth/reset.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
      handlesAuth: true,
    },
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset,
    meta: {
      title: 'Reset',
      handlesAuth: true,
    },
  },
];
