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
  [Game.OH_NO]: { minPlayers: 2, maxPlayers: 2 }, // TODO: more players
};

export const FOUR_IN_A_ROW_WIDTH = 7;
export const FOUR_IN_A_ROW_HEIGHT = 6;
export const FIVE_IN_A_ROW_WIDTH = 9;
export const FIVE_IN_A_ROW_HEIGHT = 7;
