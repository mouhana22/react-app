import axios from 'axios';

const API_BASE_URL = 'https://65c8f413a4fbc162e1126b21.mockapi.io/'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
