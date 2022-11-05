export enum Game {
  FOUR_IN_A_ROW,
  FIVE_IN_A_ROW,
}

export const MAX_CAPACITY: Record<Game, number> = {
  [Game.FOUR_IN_A_ROW]: 2,
  [Game.FIVE_IN_A_ROW]: 2,
};

export type Move = {};
