import axios from '../scripts/axios';

const auth = {
  listCourse() {
    return axios.get('/api/courses/listCourse');
  },
  updateCourse(data) {
    return axios.post('/api/courses/updateCourse', data);
  },
};

export default auth;
