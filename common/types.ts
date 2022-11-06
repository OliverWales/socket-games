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
  gameState: GameState;
  memberIds: string[];
};

export enum Game {
  FOUR_IN_A_ROW,
  FIVE_IN_A_ROW,
}

export const MAX_CAPACITY: Record<Game, number> = {
  [Game.FOUR_IN_A_ROW]: 2,
  [Game.FIVE_IN_A_ROW]: 2,
};

export const FOUR_IN_A_ROW_WIDTH = 7;
export const FOUR_IN_A_ROW_HEIGHT = 6;
export const FIVE_IN_A_ROW_WIDTH = 9;
export const FIVE_IN_A_ROW_HEIGHT = 7;

export type Board = {
  width: number;
  height: number;
  cells: (string | undefined)[][];
};

export type GameState = {
  type: Game.FOUR_IN_A_ROW | Game.FIVE_IN_A_ROW;
  board: Board;
  heights: number[];
  mode:
    | { type: "in_progress"; turn: string }
    | { type: "won"; winner: string }
    | { type: "tie" };
};

export type Move = {
  playerId: string;
  move: string;
};

export interface ServerToClientEvents {
  error: (type: Error) => void;
  room_update: (gameState: Room) => void;
}

export interface ClientToServerEvents {
  create_room: (roomId: string, game: Game) => void;
  join_room: (roomId: string) => void;
  make_game_move: (roomId: string, move: number) => void;
}
