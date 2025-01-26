const TaskModel = require('../models/taskModel');

module.exports = {
  getTasks: (req, res) => {
    TaskModel.getAllTasks((err, tasks) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(tasks);
      }
    });
  },

  createTask: (req, res) => {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    TaskModel.createTask(description, (err, task) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(task);
      }
    });
  },

  updateTask: (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (completed === undefined) {
      return res.status(400).json({ error: 'Completed status is required' });
    }

    TaskModel.updateTask(id, completed, (err, task) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(task);
      }
    });
  },

  deleteTask: (req, res) => {
    const { id } = req.params;

    TaskModel.deleteTask(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(result);
      }
    });
  },
};