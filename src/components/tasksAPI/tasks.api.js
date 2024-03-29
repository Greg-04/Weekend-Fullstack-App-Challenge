import axios from 'axios';

export const fetchTasks = () => {
    // axios GET call
    return axios.get('/api/todo');
};

export const postTask = (taskData) => {
    return axios.post('/api/todo', taskData);
  };

export const deleteTask = (taskId) => {
    return axios.delete(`/api/todo/${taskId}`);
};

export const updateTaskStatus = (taskId) => {
    return axios.put(`/api/todo/${taskId}`);
};