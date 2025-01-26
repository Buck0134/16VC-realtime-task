const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const taskRoutes = require('./routes/taskRoutes');
const socketHandler = require('./socket');
const db = require('./database/sqliteStructure');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

// HTTP Server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Update to restrict origin in production
    methods: ['GET', 'POST'],
  },
});

// Socket.IO handler
socketHandler(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Initializing database...');
  db.serialize(() => {
    console.log('Database initialization complete.');
  });
});