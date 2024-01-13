import axios from 'axios';

export const fetchTasks = () => {
    // axios GET call
    return axios.get('/api/todo');

    
    // //success
    // .then((response) => {
    //     console.log('SERVER DATA:', response.data);
    // })
    // //failure
    // .catch((err) => {
    //     console.error('ERROR:', err);
    // });
};



