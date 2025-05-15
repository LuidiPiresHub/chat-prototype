import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const clientUrl = 'http://localhost:3000';

const app = express();
app.use(express.json());
app.use(cors({ origin: clientUrl }));
const httpServer = createServer(app);
const io = new Server(httpServer, { 
   cors: {
    origin: clientUrl
  }
 });

 app.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({ message: 'Hello World!' });
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