import { Room, Game } from "../../common/types";
import { uniq } from "../../common/utils";
import { createGame } from "./game";

export const createRoom = (
  userId: string,
  roomId: string,
  game: Game
): Room => {
  console.log(`Client ${userId} created a room ${roomId}`);

  return {
    id: roomId,
    memberIds: [userId],
    gameState: createGame(game, userId),
  };
};

export const addUserToRoom = (room: Room, userId: string): Room => {
  console.log(`Client ${userId} joined a room ${room.id}`);

  return {
    ...room,
    memberIds: uniq([...room.memberIds, userId]),
  };
};

export const removeUserFromRoom = (room: Room, userId: string) => {
  console.log(`Client ${userId} left the room ${room.id}`);

  return {
    ...room,
    memberIds: room.memberIds.filter((m) => m !== userId),
  };
};
