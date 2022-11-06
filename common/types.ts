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
  sessionIds: string[];
};

export enum Game {
  FOUR_IN_A_ROW,
  FIVE_IN_A_ROW,
}

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
    | { type: "not_started"; turn: string }
    | { type: "in_progress"; turn: string }
    | { type: "won"; winner: string }
    | { type: "tie" };
};

export type Move = {
  playerId: string;
  move: string;
};
