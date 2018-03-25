import Dashboard from '../view/dashboard/teacher/overview.vue';

export default [
  {
    path: '/dashboard/teacher/',
    name: 'teacher',
    component: Dashboard,
    meta: {
      title: 'Teacher Dashboard',
      requiresAuth: true,
    },
  },
];

