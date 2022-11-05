import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "./useSocket";

import {
  CODE_LENGTH,
  CODE_REGEX,
  generateNewRoomId,
} from "../../common/roomCode";

function Home() {
  const s = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        maxWidth: "450px",
        height: "fit-content",
        padding: "30px",
        border: "3px solid #ddd",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Five in a Row</h1>
      {s.isConnected ? (
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          Connected{" "}
          <div
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              backgroundColor: "greenyellow",
              borderRadius: "100%",
            }}
          />
        </span>
      ) : (
        <span>Connecting...</span>
      )}
      <p>Join a room:</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(roomId.toLocaleUpperCase());
        }}
      >
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
        onClick={(e) => {
          e.preventDefault();
          const newRoomId = generateNewRoomId();
          navigate(newRoomId);
        }}
        disabled={!s.isConnected}
      />
    </div>
  );
}
export default Home;
