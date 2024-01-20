import {useState , useEffect} from 'react';
import {fetchTasks , deleteTask, updateTaskStatus} from '../tasksAPI/tasks.api';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import './App.css';

function App () {
  const [toDoList, setToDoList] = useState([
    // {Task: 'Task 1', Description: 'Clean House'},
    // {Task: 'Task 2', Description: 'Wash Car'},
    // {Task: 'Task 3', Description: 'Pay Bills'},
  ]);

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
            <div key={dataIndex}>
            <h3>{taskData.Task}</h3>
            <p>{taskData.Description}</p>
            <p>Status: "{taskData.Status ? 'Completed' : 'Uncompleted'}"</p>
            <p><input type="checkbox" onClick={(event) => handleTaskStatus(taskData.id)}></input> </p>
            <button onClick={(event) => handleClickDelete(taskData.id)}>Delete</button>
            </div>
          );
      })}
    </div>
  );

}

export default App
