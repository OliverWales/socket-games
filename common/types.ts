import { Game, Move } from "./games";

export enum Error {
  // Avoiding 0 allows cast to bool for easy null checking
  ROOM_NOT_FOUND = 1,
  ROOM_FULL,
  ROOM_ALREADY_EXISTS,
  INVALID_ROOM_CODE,
}

export type GameState = {
  type: Game;
};

export type Room = {
  id: string;
  gameState: GameState;
  memberIds: string[];
};

export interface ServerToClientEvents {
  error: (type: Error) => void;
  room_update: (gameState: Room) => void;
  game_update: (gameState: GameState) => void;
}

export interface ClientToServerEvents {
  create_room: (roomId: string, game: Game) => void;
  join_room: (roomId: string) => void;
  make_game_move: (move: Move) => void;
}
