const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // وەرگرتنی پۆست و ناردنی بۆ هەمووان
    socket.on('new_post', (postData) => {
        io.emit('broadcast_post', postData);
    });

    // چات و نامە ناردن لە نێوان بەکارهێنەران
    socket.on('private_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
