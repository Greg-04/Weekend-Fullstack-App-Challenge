import {useState , useEffect} from 'react';
import {fetchTasks , deleteTask, updateTaskStatus} from '../tasksAPI/tasks.api';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import './App.css';

function App () {
  const [toDoList, setToDoList] = useState([
    // {Task: 'Task 1', Description: 'Clean House'},
    // {Task: 'Task 2', Description: 'Wash Car'},
    // {Task: 'Task 3', Description: 'Pay Bills'},
  ]);

  const theme = createTheme({
    palette: {
      primary: {
        main: red[400],
      },
    },
  });

  const refreshTasks = () => {
    // api call
    const taskPromise = fetchTasks();
    taskPromise
    //success
    .then((response) => {
      console.log('SERVER DATA:', response);
      setToDoList(response.data);
  })
  //failure
  .catch((err) => {
      console.error('ERROR:', err);
  });
  };

   // initial load of component
   useEffect(() => {
    // body of effect
    console.log('Hi Hi');
    // api call
    refreshTasks();
  }, []);

    //delete function
    const handleClickDelete = (taskId) => {
      //ID item
      console.log('DELETE - taskId:', taskId);
      //Make Axios Call
      deleteTask(taskId)
      .then((response) => {
        refreshTasks();
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
    };
  
    const handleTaskStatus = (id) => {
      updateTaskStatus(id)
      .then((response) => {
        refreshTasks();
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
    };

  return (
    <div>
      <h1 className="title">TO DO APP</h1>
      <AddTaskForm taskRefreshCallback = {refreshTasks}/>
      {toDoList.map((taskData, dataIndex) => {
          return (
            <div key={dataIndex} className={taskData.Status ? 'Completed' : 'Uncompleted'}>
            <h3> Task {dataIndex + 1}: {taskData.Task}</h3>
            <p>{taskData.Description}</p>
            <i>Status: "{taskData.Status ? 'Completed' : 'Uncompleted'}"</i>
            <p><input type="checkbox" onClick={(event) => handleTaskStatus(taskData.id)}></input> </p>
            <ThemeProvider theme={theme}>
            <Button size="small" variant="contained" onClick={(event) => handleClickDelete(taskData.id)}>Delete</Button>
            </ThemeProvider>
            </div>
          );
      })}
    </div>
  );

}

export default App
