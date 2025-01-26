import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const Header = () => (
  <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
    <Typography
      variant="h4"
      align="center"
      gutterBottom
      sx={{ fontWeight: 600 }}
    >
      Real-Time Task Collaboration
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: '#555' }}
    >
      Created By{' '}
      <Link
        href="mailto:chenkaiy@andrew.cmu.edu"
        underline="hover"
        sx={{
          color: '#007AFF',
          '&:hover': {
            color: '#005BBB',
          },
        }}
      >
        Bucky Yu
      </Link>
    </Typography>
  </Box>
);

export default Header;