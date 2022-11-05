import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import { CODE_REGEX } from "../../common/roomCode";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected with id ${socket.id}`);

  socket.on("join_room", (roomId) => {
    if (!new RegExp(CODE_REGEX).test(roomId)) return;

    socket.join(roomId);
    console.log(`Client ${socket.id} joined a room ${roomId}`);
  });
});

server.listen(3000, () => {
  console.log("Server is running!");
});
