import Dashboard from '../view/dashboard/teacher/overview.vue';
import CourseInfo from '../view/dashboard/teacher/courses/info.vue';
import ReportsInfo from '../view/dashboard/teacher/reports/info.vue';

export default [
  {
    path: '/dashboard/teacher',
    name: 'teacher',
    component: Dashboard,
    meta: {
      title: 'Teacher Dashboard',
      requiresAuth: true,
      name: 'teacher',
    },
    children: [
      {
        path: 'courses',
        component: CourseInfo,
        meta: {
          title: 'Course Info',
          requiresAuth: true,
          name: 'teacher',
        },
      },
      {
        path: 'reports',
        component: ReportsInfo,
        meta: {
          title: 'Reports Info',
          requiresAuth: true,
          name: 'teacher',
        },
      },
    ],
  },
];
