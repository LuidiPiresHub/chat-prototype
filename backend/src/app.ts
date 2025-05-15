import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const clientUrl = 'http://localhost:3000';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
   cors: {
    origin: clientUrl
  }
 });

io.on("connection", (socket) => {
  socket.on('message', (message) => {
    io.emit('message', {
      message,
      senderId: socket.id
    })
  })
}); 

const port = 3001;

httpServer.listen(port);