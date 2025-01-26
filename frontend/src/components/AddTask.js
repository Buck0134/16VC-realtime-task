import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddTask = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDescription.trim() === '') return;

    onAddTask(taskDescription);
    setTaskDescription('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        marginTop: 2,
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#f9f9f9', // Light background for contrast
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label="Add a new task..."
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        sx={{
          marginRight: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 12, // Rounded corners for Apple-like aesthetics
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{
          backgroundColor: '#007AFF', // Apple-like blue button color
          borderRadius: 12,
          textTransform: 'none', // Avoid all-uppercase text
          paddingX: 3,
          '&:hover': {
            backgroundColor: '#005BBB',
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTask;