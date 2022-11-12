import { Game, InARowGameState } from "../../../common/games";
import {
  FOUR_IN_A_ROW_WIDTH,
  FOUR_IN_A_ROW_HEIGHT,
  FIVE_IN_A_ROW_WIDTH,
  FIVE_IN_A_ROW_HEIGHT,
} from "../../../common/InARow/constants";
import { Board } from "../../../common/InARow/types";
import { getSparseRef, getCoords } from "../utils";

export const createGame = (
  type: Game.FOUR_IN_A_ROW | Game.FIVE_IN_A_ROW,
  turn: string
): InARowGameState => {
  const width =
    type === Game.FOUR_IN_A_ROW ? FOUR_IN_A_ROW_WIDTH : FIVE_IN_A_ROW_WIDTH;
  const height =
    type === Game.FOUR_IN_A_ROW ? FOUR_IN_A_ROW_HEIGHT : FIVE_IN_A_ROW_HEIGHT;

  return {
    type,
    board: createBoard(width, height),
    heights: new Array(width).fill(0),
    status: { type: "not_started", turn },
  };
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
    gameState.status.type !== "in_progress" &&
    gameState.status.type !== "not_started"
  )
    return gameState;

  const currentPlayer = gameState.status.turn;
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

  // update status
  const winner = checkWin(gameState.type, newBoard, currentPlayer);
  const tie = checkTie(newBoard, newHeights);

  switch (true) {
    case winner:
      return {
        ...gameState,
        status: { type: "won", winner: currentPlayer },
        board: newBoard,
        heights: newHeights,
      };
    case tie:
      return {
        ...gameState,
        status: { type: "tie" },
        board: newBoard,
        heights: newHeights,
      };
    default:
      return {
        ...gameState,
        status: {
          type: "in_progress",
          turn: getNextTurn(sessionIds, currentPlayer),
        },
        board: newBoard,
        heights: newHeights,
      };
  }
};
