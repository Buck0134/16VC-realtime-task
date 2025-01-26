import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: 1.5,
        '&:hover': {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {/* Left Section: Task Description */}
      <Typography
        variant="body1"
        sx={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#999' : '#000',
          flex: 1,
          marginRight: 2,
        }}
      >
        {task.description}
      </Typography>

      {/* Right Section: Grouped Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Mark Completed Button */}
        <Button
          variant="contained"
          onClick={() => onComplete(task.id, !task.completed)}
          sx={{
            textTransform: 'none',
            borderRadius: 12,
            backgroundColor: task.completed ? '#757575' : '#007AFF', 
            color: '#fff', 
            '&:hover': {
              backgroundColor: task.completed ? '#616161' : '#005BBB', // when you move your cursor
            },
          }}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
        </Button>

        {/* Delete Button */}
        <Button
          variant="outlined"
          onClick={() => onDelete(task.id)}
          sx={{
            borderRadius: 12,
            color: '#d32f2f',
            borderColor: '#d32f2f',
            minWidth: '40px',
            padding: '6px',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              borderColor: '#b71c1c',
            },
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default TaskItem;