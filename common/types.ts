import { InARowGameState } from "./games";

export enum Error {
  // Avoiding 0 allows cast to bool for easy null checking
  ROOM_NOT_FOUND = 1,
  ROOM_FULL,
  ROOM_ALREADY_EXISTS,
  INVALID_ROOM_CODE,
  INVALID_MOVE,
}

export type Room = {
  id: string;
  gameState: InARowGameState;
  sessionIds: string[];
};
