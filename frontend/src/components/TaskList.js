import React from 'react';
import TaskItem from './TaskItem';
import { List, Box } from '@mui/material';

const TaskList = ({ tasks, onComplete, onDelete }) => (
  <Box
    sx={{
      maxHeight: '65vh', // maximum height
      overflowY: 'auto',  // vertical scrolling if overflows
      paddingRight: 1,    // so that the scroll bar wony overlap with the content
    }}
  >
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </List>
  </Box>
);

export default TaskList;