import Dashboard from '../view/dashboard/admin/overview.vue';
import CourseInfo from '../view/dashboard/admin/courses.vue';
import TeacherInfo from '../view/dashboard/admin/teachers.vue';
import StudentInfo from '../view/dashboard/admin/students.vue';

export default [
  {
    path: '/dashboard/admin',
    name: 'admin',
    component: Dashboard,
    meta: {
      title: 'Admin Dashboard',
      requiresAuth: true,
      name: 'admin',
    },
    children: [
      {
        path: 'courses',
        component: CourseInfo,
        meta: {
          title: 'Course Info',
          requiresAuth: true,
          name: 'admin',
        },
      },
      {
        path: 'teachers',
        component: TeacherInfo,
        meta: {
          title: 'Course Info',
          requiresAuth: true,
          name: 'admin',
        },
      },
      {
        path: 'students',
        component: StudentInfo,
        meta: {
          title: 'Student Info',
          requiresAuth: true,
          name: 'admin',
        },
      },
    ],
  },
];
