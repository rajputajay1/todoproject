import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://cuvette-tech-backend.onrender.com/api', // Update with your base URL
  baseURL: 'https://promanage-khqe.onrender.com/api', // Update with your base URL
  // baseURL: 'http://localhost:8082/api', // Update with your base URL
  headers:{
    'Content-Type':'application/json'
  }

});

export default axiosInstance;
