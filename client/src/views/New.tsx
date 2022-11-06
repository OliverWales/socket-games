import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateNewRoomId } from "../../../common/roomCode";
import { Game } from "../../../common/types";
import CenteredCard from "../components/CenteredCard";
import Page from "../components/Page";
import useSocket from "../hooks/useSocket";

function New() {
  const s = useSocket();
  const [game, setGame] = useState<Game>(Game.FIVE_IN_A_ROW);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!s.isConnected) return;

    const roomId = generateNewRoomId();

    s.socket.emit("create_room", roomId, game);
    navigate(`/${roomId}`);
  };

  return (
    <Page>
      <CenteredCard>
        <h1>Create Game</h1>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "10px",
          }}
        >
          <select
            name="game"
            id="game"
            style={{ padding: "10px 15px" }}
            onChange={(e) => setGame(e.target.value as unknown as Game)}
            value={game}
            disabled={!s.isConnected}
          >
            <option value={Game.FOUR_IN_A_ROW}>Four in a row</option>
            <option value={Game.FIVE_IN_A_ROW}>Five in a row</option>
          </select>
          <input
            type="submit"
            style={{ padding: "10px 15px" }}
            value="Create"
            disabled={!s.isConnected}
          />
        </form>
      </CenteredCard>
    </Page>
  );
}
export default New;
