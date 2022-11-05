import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { MAX_CAPACITY } from "../../common/games";

import { CODE_REGEX } from "../../common/roomCode";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  Error,
  Room,
} from "../../common/types";
import { addUserToRoom, createRoom, removeUserFromRoom } from "./room";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map<string, Room>();

io.on("connection", (socket) => {
  console.log(`[INFO] Client connected with id ${socket.id}`);

  socket.on("disconnect", () => {
    // clean up any now-empty rooms
    const roomIds = [...rooms].map(([id]) => id);
    const socketRooms = io.sockets.adapter.rooms;

    const roomsToDestroy = roomIds.filter((id) => {
      const socketRoom = socketRooms.get(id);
      return (
        !socketRoom || ![...socketRoom].filter((id) => id !== socket.id).length
      );
    });

    roomsToDestroy.forEach((r) => rooms.delete(r));

    // notify still-open room that user has left
    [...rooms].forEach(([id, room]) => {
      if (room.memberIds.includes(socket.id)) {
        const newRoom: Room = removeUserFromRoom(room, socket.id);

        rooms.set(id, newRoom);
        io.to(id).emit("room_update", newRoom);
      }
    });
  });

  socket.on("create_room", (roomId, game) => {
    if (!new RegExp(CODE_REGEX).test(roomId)) {
      socket.emit("error", Error.INVALID_ROOM_CODE);
      return null;
    }

    if ([...rooms].find(([id]) => id === roomId)) {
      socket.emit("error", Error.ROOM_ALREADY_EXISTS);
      return null;
    }

    const room = createRoom(socket.id, roomId, game);

    rooms.set(roomId, room);
    socket.join(room.id);
    io.to(roomId).emit("room_update", room);
  });

  socket.on("join_room", (roomId) => {
    if (!new RegExp(CODE_REGEX).test(roomId)) {
      socket.emit("error", Error.INVALID_ROOM_CODE);
      return;
    }

    const room = rooms.get(roomId);

    if (!room) {
      socket.emit("error", Error.ROOM_NOT_FOUND);
      return;
    }

    if (room.memberIds.length >= MAX_CAPACITY[room.gameState.type]) {
      socket.emit("error", Error.ROOM_FULL);
      return;
    }

    const newRoom = addUserToRoom(room, socket.id);

    rooms.set(roomId, newRoom);
    socket.join(roomId);
    io.to(roomId).emit("room_update", newRoom);
  });
});

server.listen(3000, () => {
  console.log("[INFO] Server is running!");
});
