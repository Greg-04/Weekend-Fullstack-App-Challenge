import { useState } from 'react';
import { postTask } from '../tasksAPI/tasks.api';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import './AddTaskForm.css'


function AddTaskForm(props) {
  const [TaskValue, setTaskValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[900],
      },
    },
  });

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
    <form onSubmit={handleSubmitTask} className="form-container">
      <label className="label">
        <span className="form-container">Task:</span>
        <input
          id="Task"
          onChange={(event) => setTaskValue(event.target.value)}
          value={TaskValue}
          className="input"
        />
      </label>
      <label className="label">
        <span className="form-container">Description:</span>
        <input
          id="Description"
          onChange={(event) => setDescriptionValue(event.target.value)}
          value={DescriptionValue}
          className="input"
        />
      </label>
      <ThemeProvider theme={theme}>
        <Button 
          type="submit"
          variant="contained"
          size="small"
        >Submit</Button>
      </ThemeProvider>
    </form>
  );
}

export default AddTaskForm;