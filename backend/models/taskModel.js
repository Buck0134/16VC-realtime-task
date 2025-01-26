const dbUtils = require('../database/databaseUtils');

class TaskModel {
  static getAllTasks(callback) {
    dbUtils.getAll('tasks', (err, rows) => {
      if (err) {
        console.error('Error fetching tasks:', err.message);
        callback(err, null);
      } else {
        // Map rows into Task objects if needed
        callback(null, rows);
      }
    });
  }

  static createTask(description, callback) {
    dbUtils.insert('tasks', ['description'], [description], (err, taskId) => {
      if (err) {
        console.error('Error creating task:', err.message);
        callback(err, null);
      } else {
        const newTask = { id: taskId, description, completed: 0 };
        callback(null, newTask);
      }
    });
  }

  static updateTask(id, completed, callback) {
    dbUtils.update(
      'tasks',
      { completed: completed ? 1 : 0 },
      `id = ${id}`,
      (err, changes) => {
        if (err) {
          console.error('Error updating task:', err.message);
          callback(err, null);
        } else if (changes === 0) {
          callback(new Error('No task found with the given ID'), null);
        } else {
          callback(null, { id, completed });
        }
      }
    );
  }

  static deleteTask(id, callback) {
    dbUtils.deleteRow('tasks', `id = ${id}`, (err, changes) => {
      if (err) {
        console.error('Error deleting task:', err.message);
        callback(err, null);
      } else if (changes === 0) {
        callback(new Error('No task found with the given ID'), null);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = TaskModel;