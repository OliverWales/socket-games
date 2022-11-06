import cors from "cors";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { v4 } from "uuid";

import { MAX_CAPACITY } from "../../common/constants";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/socketEvents";
import { CODE_REGEX } from "../../common/roomCode";
import { Error, Room } from "../../common/types";
import { addUserToRoom, createRoom, removeUserFromRoom } from "./room";
import { getNextState } from "./game";
import { shorten } from "./utils";
import { env } from "process";

// Log key:
// <socket>: socket ID
// (session): first 8 chars of session ID
// [room]: room code

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const sessionIdMap = new Map<string, string>();
const rooms = new Map<string, Room>();
const roomsForDeletion = new Map<string, NodeJS.Timeout>();

const getSessionId = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  const { id: socketId } = socket;
  if (
    socket.handshake.query.sessionId &&
    sessionIdMap.has(socket.handshake.query.sessionId as string)
  ) {
    const sessionId = socket.handshake.query.sessionId as string;
    sessionIdMap.set(sessionId, socketId);
    console.log(
      `<${shorten(socketId)}> rejoined session (${shorten(sessionId)})`
    );
    return sessionId;
  } else {
    const newId = v4();
    sessionIdMap.set(newId, socketId);
    socket.emit("session_id", newId);
    console.log(`<${shorten(socketId)}> created session (${shorten(newId)})`);
    return newId;
  }
};

io.on("connection", (socket) => {
  const { id: socketId } = socket;
  console.log(`<${shorten(socketId)}> connected`);
  const sessionId = getSessionId(socket);

  const onLeaveRoom = () => {
    // if session was only user in room, delete room
    const roomsToDelete = [...rooms].filter(
      ([, room]) => !room.sessionIds.some((id) => id !== sessionId)
    );

    roomsToDelete.forEach(([roomId]) => {
      console.log(`[${roomId}] was left by (${shorten(sessionId)})`);
      console.log(
        `[${roomId}] is empty and will be deleted in 5s if no one joins`
      );

      const deleteTimeout = setTimeout(() => {
        rooms.delete(roomId);
        roomsForDeletion.delete(roomId);
        console.log(`[${roomId}] was deleted`);
      }, 5000);
      roomsForDeletion.set(roomId, deleteTimeout);
    });

    // notify still-open rooms that user has left
    [...rooms].forEach(([id, room]) => {
      if (room.sessionIds.includes(sessionId)) {
        console.log(`[${id}] was left by (${shorten(sessionId)})`);
        const newRoom = removeUserFromRoom(room, sessionId);

        rooms.set(id, newRoom);
        io.to(id).emit("room_update", newRoom);
      }
    });
  };

  socket.on("disconnect", onLeaveRoom);
  socket.on("leave_room", onLeaveRoom);

  socket.on("create_room", (roomId, game) => {
    if (!new RegExp(CODE_REGEX).test(roomId)) {
      socket.emit("error", Error.INVALID_ROOM_CODE);
      return null;
    }

    if ([...rooms].find(([id]) => id === roomId)) {
      socket.emit("error", Error.ROOM_ALREADY_EXISTS);
      return null;
    }

    const room = createRoom(roomId, sessionId, game);

    rooms.set(roomId, room);
    socket.join(room.id);

    io.to(roomId).emit("room_update", room);
    console.log(`(${shorten(sessionId)}) created room [${roomId}]`);
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

    if (room.sessionIds.includes(sessionId)) return; // already in

    if (room.sessionIds.length >= MAX_CAPACITY[room.gameState.type]) {
      socket.emit("error", Error.ROOM_FULL);
      return;
    }

    const newRoom = addUserToRoom(room, sessionId);

    rooms.set(roomId, newRoom);
    socket.join(roomId);
    io.to(roomId).emit("room_update", newRoom);
    console.log(`[${roomId}] was joined by (${shorten(sessionId)})`);

    // cancel deletion of room if scheduled
    if (roomsForDeletion.has(roomId)) {
      clearTimeout(roomsForDeletion.get(roomId));
      roomsForDeletion.delete(roomId);
    }
  });

  socket.on("make_game_move", (roomId, move) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit("error", Error.ROOM_NOT_FOUND);
      return;
    }

    const newRoom: Room = {
      ...room,
      gameState: getNextState(room.gameState, room.sessionIds, move),
    };

    rooms.set(roomId, newRoom);
    io.to(roomId).emit("room_update", newRoom);
    console.log(`[${roomId}] (${shorten(sessionId)}) made a move`);
  });
});

server.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT ?? 3000}`);
});
