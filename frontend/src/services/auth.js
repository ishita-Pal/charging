import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  localStorage.setItem('token', response.data.token)
  return response.data
}

export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData)
  return response.data
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}