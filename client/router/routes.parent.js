import Dashboard from '../view/dashboard/parent/overview.vue';

export default [
  {
    path: '/dashboard/parent/',
    name: 'parent',
    component: Dashboard,
    meta: {
      title: 'Parent Dashboard',
      requiresAuth: true,
    },
  },
];
