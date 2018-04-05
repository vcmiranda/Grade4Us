import axios from '../scripts/axios';

const auth = {
  listGrade() {
    return axios.get('/api/grades/listGrade');
  },
};

export default auth;
