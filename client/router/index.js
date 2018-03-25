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

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: publicComponent,
      children: publicChildren,
      meta: {
        title: 'Public Main',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboardComponent,
      children: dashboardChildren,
      meta: {
        title: 'Dashboard Main',
        requiresAuth: true,
      },
    },
  ],
});

function redirectDashboard(next) {
  const userStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  if (userStorage.admin_id) {
    next({
      path: '/dashboard/admin',
    });
  } else if (userStorage.teacher_id) {
    next({
      path: '/dashboard/teacher',
    });
  } else if (userStorage.parent_id) {
    next({
      path: '/dashboard/parent',
    });
  }
}

// /* ****** Router Guards ****** */

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('user')) {
      next({
        path: '/login',
      });
    } else if (to.name === 'dashboard') {
      redirectDashboard(next);
    } else {
      next({
        path: '/',
      });
    }
  } else if (to.matched.some(record => record.meta.handlesAuth)) {
    if (localStorage.getItem('user')) {
      redirectDashboard(next);
    } else {
      next();
    }
  } else if (to.name === null) {
    next({
      path: '/',
    });
  } else {
    next();
  }
});

export default router;
