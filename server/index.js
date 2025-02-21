import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import messageRoutes from './routes/messageRoutes.js';

const cors = req

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" }
});


// Middleware
app.use(cors({
  origin: ["https://chatapp-wheat-one.vercel.app/", "http://localhost:3000"], // Replace with your frontend URL
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/messages', messageRoutes);

// Add this after your routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }

  const io = new Server(httpServer, {
    cors: {
      origin: "https://chatapp-wheat-one.vercel.app/", // Replace with your frontend URL
      methods: ["GET", "POST"],
    },
  });
  
  io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('sendMessage', async (message) => {
      io.emit('newMessage', message); // Broadcast the message to all users
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });


const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

