import { io } from 'socket.io-client';

// Connect to the WebSocket server
const SOCKET_URL = process.env.REACT_APP_SOCKET_BASE_URL || 'http://localhost:5001'

const socket = io(SOCKET_URL); // Make this ENV

// Log successful connection
socket.on('connect', () => {
  console.log(`Connected to WebSocket server with ID: ${socket.id}`);
});

// Log disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

export default socket;