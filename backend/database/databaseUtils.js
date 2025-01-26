const db = require('./sqliteDBStructure'); // The initialized database

module.exports = {
  // Fetch all tasks
  getAllTasks: (callback) => {
    const query = 'SELECT * FROM tasks';
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },

  // Add a new task
  createTask: (description, callback) => {
    const query = 'INSERT INTO tasks (description) VALUES (?)';
    db.run(query, [description], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, description, completed: 0 });
      }
    });
  },

  // Update a task's completion status
  updateTask: (id, completed, callback) => {
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.run(query, [completed ? 1 : 0, id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id, completed });
      }
    });
  },

  // Delete a task
  deleteTask: (id, callback) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id });
      }
    });
  },
};