import Dashboard from '../view/dashboard/parent/overview.vue';
import StudentInfo from '../view/dashboard/parent/students/info.vue';
import ReportsInfo from '../view/dashboard/parent/reports//info.vue';

export default [
  {
    path: '/dashboard/parent',
    name: 'parent',
    component: Dashboard,
    meta: {
      title: 'Parent Dashboard',
      requiresAuth: true,
      name: 'parent',
    },
    children: [
      {
        path: 'students',
        component: StudentInfo,
        meta: {
          title: 'Student Info',
          requiresAuth: true,
          name: 'parent',
        },
      },
      {
        path: 'reports',
        component: ReportsInfo,
        meta: {
          title: 'Reports Info',
          requiresAuth: true,
          name: 'parent',
        },
      },
    ],
  },
];
