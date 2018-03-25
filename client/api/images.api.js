import axios from '../scripts/axios';

const auth = {
  getImageStudent(student) {
    return axios.get('/api/images/getImageStudent', {
      headers: { studentid: student.studentID },
    });
  },
  saveImageStudent(student) {
    return axios.post('/api/images/saveImageStudent', {
      studentID: student.studentID,
      studentImage: student.studentImage,
    });
  },
};

export default auth;
