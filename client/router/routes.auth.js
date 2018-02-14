// Auth Pages
import Login from '../view/public/auth/login.vue';
import Register from '../view/public/auth/register.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];
