import { fetchTasks, createTask, updateTask, deleteTask } from '../api/taskApi';
import socket from '../socket'

export const getTasks = async (setTasks) => {
  const tasks = await fetchTasks();
  setTasks(tasks);
};

export const addTask = async (description, setTasks) => {
  const newTask = await createTask(description);
  setTasks((prevTasks) => [...prevTasks, newTask]);
};

export const completeTask = async (id, completed, setTasks) => {
  await updateTask(id, completed);
  setTasks((prevTasks) =>
    prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
  );
};

export const removeTask = async (id, setTasks) => {
  await deleteTask(id);
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
};

// Socket listener for real-time updates
export const setupSocketListeners = (setTasks) => {
  socket.on('TASK_UPDATED', () => {
    console.log('TASK_UPDATED event received, refetching tasks....');
    // once we here there is an update. Use rest API to fetch all tasks. 
    getTasks(setTasks); // Refetch tasks when notified of updates
  });
};