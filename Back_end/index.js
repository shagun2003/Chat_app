const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500

app.use(cors({
  origin: ["https://chat-app-wn4o.vercel.app"], // Frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("HELLO, IT'S WORKING");
});

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: ["https://chat-app-wn4o.vercel.app"], // Frontend URL
    methods: ["GET", "POST"],
    credentials: true
  },
  path: '/socket.io' // Ensure this path matches the frontend
});

const users = {};

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on('joined', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined with socket ID: ${socket.id}`);
    socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
    socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
  });

  socket.on('message', ({ message, id }) => {
    io.emit('sendmessage', { user: users[id], message, id });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
    console.log('User left');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
