const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const taskRoutes = require('./routes/taskRoutes');
const socketHandler = require('./socket');
const db = require('./database/sqliteStructure');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

// HTTP Server
const server = http.createServer(app);

// Socket.IO
// Initialize Socket.IO
const io = new Server(server, {
    cors: {
      origin: '*', // Update with frontend URL in production
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
  
  // Socket.IO handler to pass `io` to other modules
  socketHandler(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Initializing database...');
  db.serialize(() => {
    console.log('Database initialization complete.');
  });
});