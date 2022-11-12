import Ellipses from "../../components/Ellipses";
import useSocket from "../../hooks/useSocket";
import { Room } from "../../../../common/types";
import CenteredCard from "../../components/CenteredCard";
import { useNavigate } from "react-router-dom";
import { InARowGameState } from "../../../../common/games";

const TopText = ({
  playerId,
  gameState,
}: {
  playerId: string;
  gameState: InARowGameState;
}) => {
  const navigate = useNavigate();
  const homeButton = (
    <button
      onClick={() => navigate("/")}
      style={{ padding: "10px 15px", marginLeft: "20px" }}
    >
      Home
    </button>
  );

  switch (gameState.status.type) {
    case "not_started":
    case "in_progress":
      return gameState.status.turn === playerId ? (
        <p>
          <b style={{ color: "red" }}>Your</b> turn
        </p>
      ) : (
        <p>
          <b style={{ color: "gold" }}>Anon's</b> turn
          <Ellipses />
        </p>
      );
    case "won":
      return gameState.status.winner == playerId ? (
        <p>
          <b>You win!!!</b>
          {homeButton}
        </p>
      ) : (
        <p>
          <b style={{ color: "gold" }}>Anon</b> wins, better luck next time.
          {homeButton}
        </p>
      );
    case "tie":
      return (
        <p>
          <b>It's a draw!</b>
          {homeButton}
        </p>
      );
  }
};

const InARow = ({ room }: { room: Room }) => {
  const s = useSocket();
  if (!s.isConnected)
    return (
      <p>
        Connection lost, retrying
        <Ellipses />
      </p>
    );

  const { sessionId, socket } = s;

  const { gameState } = room;
  const turn =
    gameState.status.type === "not_started" ||
    gameState.status.type === "in_progress"
      ? gameState.status.turn
      : undefined;

  const addToken = (x: number) => {
    if (turn !== sessionId || gameState.heights[x] >= gameState.board.height)
      return;

    socket.emit("make_game_move", room.id, x);
  };

  const CELL_SIZE = `calc(min(60vw / ${gameState.board.width}, 60vh / ${gameState.board.height}))`;

  return (
    <CenteredCard width="80%" noBorder>
      <TopText playerId={sessionId} gameState={gameState} />
      <table
        style={{
          border: "1px solid white",
        }}
      >
        <thead>
          <tr>
            {gameState.heights.map((h, x) => (
              <th
                key={x}
                style={{
                  backgroundColor: `rgba(128, 128, 128, ${
                    h === gameState.board.height ? 0.5 : 1
                  })`,
                  width: CELL_SIZE,
                  height: "20px",
                  border: "2px solid black",
                }}
                onClick={() => addToken(x)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {gameState.board.cells.map((row, i) => (
            <tr key={i}>
              {row.map((c, j) => {
                const cellColour =
                  c == null ? undefined : c === sessionId ? "red" : "gold";

                return (
                  <th key={j}>
                    <div
                      style={{
                        background: cellColour,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        borderRadius: "100%",
                        border: "2px solid grey",
                      }}
                    />
                  </th>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </CenteredCard>
  );
};
export default InARow;