import axios from 'axios';
import { useState } from 'react';

const AddTaskForm = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask) {
      const request = await axios.post('/api/task/new', { text: newTask });
      setTasks([request.data, ...tasks]);
      setNewTask('');
    }
  };

  return (
    <form className='add-form'>
      <input
        type='text'
        placeholder='Add task...'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type='submit' className='btn' onClick={(e) => addTask(e)}>
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
