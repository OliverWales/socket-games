import { InProgress, NotStarted, Tied, Won } from "./gameStatus";
import { Board } from "./InARow/types";
import { Card, Colour } from "./OhNo/types";

export enum Game {
  FOUR_IN_A_ROW,
  FIVE_IN_A_ROW,
  OH_NO,
}

export const GAME_CONFIGS: Record<
  Game,
  { minPlayers: number; maxPlayers: number }
> = {
  [Game.FOUR_IN_A_ROW]: { minPlayers: 2, maxPlayers: 2 },
  [Game.FIVE_IN_A_ROW]: { minPlayers: 2, maxPlayers: 2 },
  [Game.OH_NO]: { minPlayers: 2, maxPlayers: 2 }, // TODO: allow more players?
};

export type InARowGameState = {
  type: Game.FOUR_IN_A_ROW | Game.FIVE_IN_A_ROW;
  board: Board;
  heights: number[];
  status: NotStarted | InProgress | Won | Tied;
};

export type InARowMove = {
  playerId: string;
  move: number;
};

export type OhNoGameState = {
  type: Game.OH_NO;
  hands: Record<string, Card[]>;
  lastCard: Card;
  currentColour?: Colour;
  status: NotStarted | InProgress | Won;
};

export type OhNoMove = {
  playerId: string;
  play?: Card; // no play = draw card(s)
};

export type GameState = InARowGameState | OhNoGameState;
export type Move = InARowMove | OhNoMove;
