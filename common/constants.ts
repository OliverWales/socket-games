import { Game } from "./types";

export const MAX_CAPACITY: Record<Game, number> = {
  [Game.FOUR_IN_A_ROW]: 2,
  [Game.FIVE_IN_A_ROW]: 2,
};

export const FOUR_IN_A_ROW_WIDTH = 7;
export const FOUR_IN_A_ROW_HEIGHT = 6;
export const FIVE_IN_A_ROW_WIDTH = 9;
export const FIVE_IN_A_ROW_HEIGHT = 7;
