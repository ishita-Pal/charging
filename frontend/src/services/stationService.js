import axios from 'axios';

const API_URL = 'https://charging-6.onrender.com/charging-stations';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    // Redirect to login or handle missing token
    window.location.href = '/login';
  }
  return token;
};

export const fetchStations = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Fetch stations error:', error.response?.data || error.message);
    throw error;
  }
};

export const createStation = async (data) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const updateStation = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const deleteStation = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
