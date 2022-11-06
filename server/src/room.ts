import { Room, Game } from "../../common/types";
import { uniq } from "../../common/utils";
import { createGame } from "./game";

export const createRoom = (
  id: string,
  sessionId: string,
  game: Game
): Room => ({
  id,
  sessionIds: [sessionId],
  gameState: createGame(game, sessionId),
});

export const addUserToRoom = (room: Room, sessionId: string): Room => ({
  ...room,
  sessionIds: uniq([...room.sessionIds, sessionId]),
});

export const removeUserFromRoom = (room: Room, userId: string): Room => ({
  ...room,
  sessionIds: room.sessionIds.filter((m) => m !== userId),
});
