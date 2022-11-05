import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSocket from "../hooks/useSocket";
import { CODE_LENGTH, CODE_REGEX } from "../../../common/roomCode";
import Page from "../components/Page";
import CenteredCard from "../components/CenteredCard";

function Home() {
  const s = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(roomId.toLocaleUpperCase());
  };

  const createRoom = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate("new");
  };

  return (
    <Page>
      <CenteredCard>
        <h1>Simple Online Games</h1>
        <p>Join a room:</p>
        <form onSubmit={joinRoom}>
          <input
            type="text"
            name="room"
            required
            title={`Your room code should be ${CODE_LENGTH} letters`}
            pattern={CODE_REGEX}
            style={{ padding: "10px", marginRight: "10px", width: "200px" }}
            disabled={!s.isConnected}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="submit"
            style={{ padding: "10px 15px" }}
            value="Join"
            disabled={!s.isConnected}
          />
        </form>
        <p>or</p>
        <input
          type="submit"
          style={{ padding: "10px 15px", marginBottom: "20px" }}
          value="Create a new room"
          onClick={createRoom}
          disabled={!s.isConnected}
        />
      </CenteredCard>
    </Page>
  );
}
export default Home;
