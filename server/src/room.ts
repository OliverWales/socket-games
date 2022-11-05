import { Game } from "../../common/games";
import { Room } from "../../common/types";
import { uniq } from "../../common/utils";

export const createRoom = (
  userId: string,
  roomId: string,
  game: Game
): Room => {
  console.log(`[INFO] Client ${userId} created a room ${roomId}`);

  return {
    id: roomId,
    memberIds: [userId],
    gameState: { type: game },
  };
};

export const addUserToRoom = (room: Room, userId: string): Room => {
  console.log(`[INFO] Client ${userId} joined a room ${room.id}`);

  return {
    ...room,
    memberIds: uniq([...room.memberIds, userId]),
  };
};

export const removeUserFromRoom = (room: Room, userId: string) => {
  console.log(`[INFO] Client ${userId} left the room ${room.id}`);

  return {
    ...room,
    memberIds: room.memberIds.filter((m) => m !== userId),
  };
};
