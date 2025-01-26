import React, { useEffect, useState } from 'react';
import TasksPage from './pages/TasksPage';
import { getTasks, addTask, completeTask, removeTask, setupSocketListeners } from './logic/taskLogic';
import socket from './socket';


const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks(setTasks);
    setupSocketListeners(setTasks);

    return () => {
      socket.off('TASK_UPDATED');
    };
  }, []);

  const handleAddTask = async (description) => {
    await addTask(description, setTasks);
  };

  const handleCompleteTask = async (id, completed) => {
    await completeTask(id, completed, setTasks);
  };

  const handleDeleteTask = async (id) => {
    await removeTask(id, setTasks);
  };

  return (
    <TasksPage
      tasks={tasks}
      onAddTask={handleAddTask}
      onCompleteTask={handleCompleteTask}
      onDeleteTask={handleDeleteTask}
    />
  );
};

export default App;