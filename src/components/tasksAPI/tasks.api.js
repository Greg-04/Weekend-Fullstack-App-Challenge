import axios from 'axios';

export const fetchTasks = () => {
    // axios GET call
    return axios.get('/api/todo');
};

export const postTask = (taskData) => {
    return axios.post('/api/todo', taskData);
  };

