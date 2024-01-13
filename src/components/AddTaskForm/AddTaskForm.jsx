import { useState } from 'react';
import { postTask } from '../tasksAPI/tasks.api';

function AddTaskForm(props) {
  const [TaskValue, setTaskValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');

  const handleSubmitTask = (event) => {
    event.preventDefault();
    console.log('Values for SUBMIT:', {
      Task: TaskValue,
      Description: DescriptionValue,
    });

    // post data
    postTask({
      Task: TaskValue,
      Description: DescriptionValue,
    })
      .then((response) => {
        // on success fetchData
        props.taskRefreshCallback();

        setTaskValue('');
        setDescriptionValue('');
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  };

  return (
    <form onSubmit={handleSubmitTask}>
      <label>
        <span>Task:</span>
        <input
          id="Task"
          onChange={(event) => setTaskValue(event.target.value)}
          value={TaskValue}
        />
      </label>
      <label>
        <span>Description:</span>
        <input
          id="Description"
          onChange={(event) => setDescriptionValue(event.target.value)}
          value={DescriptionValue}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTaskForm;