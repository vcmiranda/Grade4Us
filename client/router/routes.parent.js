import Dashboard from '../view/dashboard/parent/overview.vue';
import StudentInfo from '../view/dashboard/parent/students/info.vue';


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
    children: [{
      path: 'students',
      component: StudentInfo,
      meta: {
        title: 'Student Info',
        requiresAuth: true,
        name: 'parent',
      },
    }],
  },
];
