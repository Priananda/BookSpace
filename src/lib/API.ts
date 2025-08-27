import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68ae9bb6b91dfcdd62b9a392.mockapi.io/api/v1', // base URL mock API kamu
});

export default api;
