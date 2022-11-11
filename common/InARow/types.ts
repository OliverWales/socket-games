import { Game } from "../games";

export type Board = {
  width: number;
  height: number;
  cells: (string | undefined)[][];
};

export type InARowGameState = {
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
  move: number;
};
