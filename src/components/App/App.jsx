import {useState , useEffect} from 'react';
import {fetchTasks} from '../tasksAPI/tasks.api';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

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

  return (
    <div>
      <AddTaskForm taskRefreshCallback = {refreshTasks}/>
      <h1>TO DO APP</h1>
      {toDoList.map((taskData, dataIndex) => {
          return (
            <div key={dataIndex}>
            <h3>{taskData.Task}</h3>
            <p>{taskData.Description}</p>
            </div>
          );
      })}
    </div>
  );

}

export default App
