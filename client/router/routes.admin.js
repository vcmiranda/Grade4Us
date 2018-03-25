import Dashboard from '../view/dashboard/admin/overview.vue';

export default [
  {
    path: '/dashboard/admin/',
    name: 'admin',
    component: Dashboard,
    meta: {
      title: 'Admin Dashboard',
      requiresAuth: true,
    },
  },
];
