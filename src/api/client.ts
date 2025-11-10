import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://meditrack.com/api',// to change later
  timeout: 10000,
});

export default apiClient;
