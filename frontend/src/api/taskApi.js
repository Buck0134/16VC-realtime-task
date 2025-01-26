import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';

const API_SUFFIX = '/tasks';

const API_URL = API_BASE_URL + API_SUFFIX

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (description) => {
  const response = await axios.post(API_URL, { description });
  return response.data;
};

export const updateTask = async (id, completed) => {
  const response = await axios.put(`${API_URL}/${id}`, { completed });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};