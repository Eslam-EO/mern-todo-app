import { useState, useEffect } from 'react';
import axios from 'axios';

import TaskItem from './components/TaskItem';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const request = await axios.get('/api/task/tasks');
    setTasks(request.data);
  };

  return (
    <>
      <header className='container'>
        <nav>TODO App</nav>
      </header>
      <section className='container'>
        <AddTaskForm tasks={tasks} setTasks={setTasks} />
        <span className='ur-tasks'>Your Tasks</span>
        <div className='tasks'>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskItem key={index} task={task} setTasks={setTasks} />
            ))
          ) : (
            <p className='empty'>You don't have any tasks!</p>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
