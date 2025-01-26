import React from 'react';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { Box, Typography, Container } from '@mui/material';


// we should import JS logic here from App.js

const TasksPage = ({ tasks, onAddTask, onCompleteTask, onDeleteTask }) => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      {/* Header */}
      <Header />

      {/* Task List */}
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          padding: 3,
          marginTop: 2,
          minHeight: '300px', // Ensures space is reserved even if no tasks exist
        }}
      >
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} onComplete={onCompleteTask} onDelete={onDeleteTask} />
        ) : (
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: '#999',
              marginTop: '50px',
            }}
          >
            There are no tasks.
          </Typography>
        )}
      </Box>

      {/* Add Task Form */}
      <AddTask onAddTask={onAddTask} />
    </Container>
  );
};

export default TasksPage;