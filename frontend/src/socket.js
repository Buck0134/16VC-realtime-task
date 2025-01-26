import { io } from 'socket.io-client';

// Connect to the WebSocket server
const socket = io('http://localhost:5001'); // Make this ENV

// Log successful connection
socket.on('connect', () => {
  console.log(`Connected to WebSocket server with ID: ${socket.id}`);
});

// Log disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

export default socket;