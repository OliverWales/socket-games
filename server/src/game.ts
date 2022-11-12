import {
  Game,
  GameState,
  Move,
  InARowGameState,
  InARowMove,
} from "../../common/games";
import {
  createGame as createInARowGame,
  getNextState as getNextInARowState,
} from "./games/inARow";

export const createGame = (type: Game, turn: string): InARowGameState => {
  switch (
    +type // TS weirdness
  ) {
    case Game.FOUR_IN_A_ROW:
      return createInARowGame(Game.FOUR_IN_A_ROW, turn);
    case Game.FIVE_IN_A_ROW:
      return createInARowGame(Game.FIVE_IN_A_ROW, turn);
    default:
      throw new Error(`Game type not implemented: ${type}`);
  }
};

export const getNextState = (
  gameState: GameState,
  sessionIds: string[],
  move: Move
): GameState => {
  switch (
    +gameState.type // TS weirdness
  ) {
    case Game.FOUR_IN_A_ROW:
    case Game.FIVE_IN_A_ROW:
      return getNextInARowState(
        gameState as InARowGameState,
        sessionIds,
        (move as InARowMove).move
      );
    default:
      throw new Error(`Game type not implemented: ${gameState.type}`);
  }
};
