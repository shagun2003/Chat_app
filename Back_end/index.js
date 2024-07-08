const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;

const users = {};

app.use(cors());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("HELLO IT'S WORKING");
});

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://chat-app-wwqf.vercel.app/cat", // Replace with your frontend URL
    methods: ["GET"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on('joined', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
    socket.emit('welcome', { user: "Admin", message: `Welcome to the chat ${users[socket.id]}` });
  });

  socket.on('message', ({ message, id }) => {
    io.emit('sendmessage', { user: users[id], message, id });
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
      console.log('User left');
      delete users[socket.id]; // Clean up user from list
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
