import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:8081', // Development
  baseURL: 'https://www.grade4us.tk', // Production
});
