import { Game } from "../../common/games";
import { Board, InARowGameState } from "../../common/InARow/types";
import {
  FOUR_IN_A_ROW_WIDTH,
  FOUR_IN_A_ROW_HEIGHT,
  FIVE_IN_A_ROW_WIDTH,
  FIVE_IN_A_ROW_HEIGHT,
} from "../../common/games";
import { getCoords, getSparseRef } from "./utils";

export const createGame = (type: Game, turn: string): InARowGameState => {
  switch (
    +type // TS weirdness
  ) {
    case Game.FOUR_IN_A_ROW:
      return {
        type: Game.FOUR_IN_A_ROW,
        board: createBoard(FOUR_IN_A_ROW_WIDTH, FOUR_IN_A_ROW_HEIGHT),
        heights: new Array(FOUR_IN_A_ROW_WIDTH).fill(0),
        mode: { type: "not_started", turn },
      };
    case Game.FIVE_IN_A_ROW:
      return {
        type: Game.FIVE_IN_A_ROW,
        board: createBoard(FIVE_IN_A_ROW_WIDTH, FIVE_IN_A_ROW_HEIGHT),
        heights: new Array(FIVE_IN_A_ROW_WIDTH).fill(0),
        mode: { type: "not_started", turn },
      };
    default:
      throw new Error(`Game type not implemented: ${type}`);
  }
};

const createBoard = (width: number, height: number): Board => ({
  cells: new Array(height).fill(new Array(width).fill(null)),
  width,
  height,
});

const checkWin = (type: Game, board: Board, player: string) => {
  const myCells = new Map<string, string>();
  board.cells.forEach((row, y) =>
    row.map((cell, x) => {
      if (cell === player) myCells.set(getSparseRef(x, y), cell);
    })
  );

  const goal = +type === Game.FOUR_IN_A_ROW ? 4 : 5;
  const offsets = Array(goal).fill(0);

  return [...myCells].some(([ref]) => {
    const [x, y] = getCoords(ref);

    // UP
    if (
      offsets.every(
        (_, offset) =>
          y + offset < board.height &&
          !!myCells.get(getSparseRef(x, y + offset))
      )
    ) {
      return true;
    }

    // RIGHT
    if (
      offsets.every(
        (_, offset) =>
          x + offset < board.width && !!myCells.get(getSparseRef(x + offset, y))
      )
    ) {
      return true;
    }

    // UP RIGHT
    if (
      offsets.every(
        (_, offset) =>
          x + offset < board.width &&
          y + offset < board.height &&
          !!myCells.get(getSparseRef(x + offset, y + offset))
      )
    ) {
      return true;
    }

    // DOWN RIGHT
    if (
      offsets.every(
        (_, offset) =>
          x + offset < board.width &&
          y - offset >= 0 &&
          !!myCells.get(getSparseRef(x + offset, y - offset))
      )
    ) {
      return true;
    }

    return false;
  });
};

const checkTie = (board: Board, heights: number[]) => {
  return heights.every((h) => h >= board.height);
};

const getNextTurn = (players: string[], currentTurn: string) => {
  const idx = players.indexOf(currentTurn) + 1;
  return players[idx % players.length];
};

export const getNextState = (
  gameState: InARowGameState,
  sessionIds: string[],
  x: number
): InARowGameState => {
  if (
    gameState.mode.type !== "in_progress" &&
    gameState.mode.type !== "not_started"
  )
    return gameState;

  const currentPlayer = gameState.mode.turn;
  const y = gameState.board.height - gameState.heights[x] - 1;

  // update heights
  const newHeights = gameState.heights.slice();
  newHeights[x] = gameState.heights[x] + 1;

  // update board
  const newCells = gameState.board.cells.slice();
  const newRow = gameState.board.cells[y].slice();
  newRow[x] = currentPlayer;
  newCells[y] = newRow;
  const newBoard = { ...gameState.board, cells: newCells };

  // update mode
  const winner = checkWin(gameState.type, newBoard, currentPlayer);
  const tie = checkTie(newBoard, newHeights);

  switch (true) {
    case winner:
      return {
        ...gameState,
        mode: { type: "won", winner: currentPlayer },
        board: newBoard,
        heights: newHeights,
      };
    case tie:
      return {
        ...gameState,
        mode: { type: "tie" },
        board: newBoard,
        heights: newHeights,
      };
    default:
      return {
        ...gameState,
        mode: {
          type: "in_progress",
          turn: getNextTurn(sessionIds, currentPlayer),
        },
        board: newBoard,
        heights: newHeights,
      };
  }
};
