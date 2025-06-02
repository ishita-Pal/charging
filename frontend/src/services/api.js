import axios from 'axios'

const api = axios.create({
  baseURL: 'https://charging-6.onrender.com/api',
})

// Request interceptor to add auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
