const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// GET all tasks
router.get('/', taskController.getTasks);

// POST a new task
router.post('/', taskController.createTask);

// PUT update a task's completion status
router.put('/:id', taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;