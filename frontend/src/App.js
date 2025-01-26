import React from 'react';
import { Button, TextField } from '@mui/material';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">React + Tailwind + MUI</h1>
        <p className="text-gray-600 mb-6">This is a test to ensure everything is working.</p>
        
        {/* Material-UI TextField */}
        <TextField
          label="Enter something"
          variant="outlined"
          fullWidth
          className="mb-4"
        />

        {/* Material-UI Button */}
        <Button
          variant="contained"
          color="primary"
          className="w-full"
        >
          MUI Button
        </Button>

        {/* Tailwind-styled Button */}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Tailwind Button
        </button>
      </div>
    </div>
  );
};

export default App;