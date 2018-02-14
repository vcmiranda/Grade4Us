import Vue from 'vue';
import Router from 'vue-router';

import publicComponent from '../view/public/public.vue';
import dashboardComponent from '../view/dashboard/dashboard.vue';

import publicRoutes from './routes.public';
import authRoutes from './routes.auth';
import adminRoutes from './routes.admin';
import teacherRoutes from './routes.teacher';
import parentRoutes from './routes.parent';

Vue.use(Router);

const publicChildren = publicRoutes.concat(authRoutes);
const dashboardChildren = adminRoutes.concat(teacherRoutes.concat(parentRoutes));

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: publicComponent,
      children: publicChildren,
    },
    {
      path: '/dashboard',
      component: dashboardComponent,
      children: dashboardChildren,
    },
  ],
});
