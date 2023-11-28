import { useState } from 'react';
import axios from 'axios';
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';

const TaskItem = ({ task, setTasks }) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState('');

  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const markTask = async (id) => {
    const request = await axios.put(`/api/task/complete/${id}`);
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task._id === request.data._id) {
          task.isComplete = request.data.isComplete;
        }
        return task;
      }),
    );
  };

  const deleteTask = async (id) => {
    const request = await axios.delete(`/api/task/delete/${id}`);
    setTasks((tasks) => tasks.filter((task) => task._id !== request.data._id));
  };

  const toggleEdit = () => {
    setEditing(true);
    setNewValue(task.text);
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    setEditing(false);
    if (newValue) {
      if (newValue !== task.text) {
        await axios.put(`/api/task/edit/${id}`, { text: newValue });
        setTasks((tasks) =>
          tasks.map((task) => {
            if (task._id == id) {
              task.text = newValue;
            }
            return task;
          }),
        );
      }
    }
  };

  return (
    <div className='task-container'>
      <div
        className={`task ${task.isComplete ? 'is-complete' : ''}`}
        style={viewMode}
      >
        <div className='text' onClick={() => markTask(task._id)}>
          <div className='checkbox'></div>
          <p>{task.text}</p>
        </div>
        <div className='btns'>
          <button
            className='btn delete-btn'
            onClick={() => deleteTask(task._id)}
          >
            <FaRegTrashCan />
          </button>
          <button className='btn edit-btn' onClick={toggleEdit}>
            <FaPenToSquare />
          </button>
        </div>
      </div>
      <form className='edit-input' style={editMode}>
        <input
          type='text'
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button
          type='submit'
          className='btn'
          onClick={(e) => handleEdit(e, task._id)}
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default TaskItem;
