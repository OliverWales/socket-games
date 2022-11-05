import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Error, Room } from "../../../common/types";
import CenteredCard from "../components/CenteredCard";
import Page from "../components/Page";
import useSocket from "../hooks/useSocket";

function Game() {
  const s = useSocket();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [gameState, setGameState] = useState<Room | null>(null);

  // On load, request to join room
  useEffect(() => {
    if (!s.isConnected || !roomId) return;
    s.socket.emit("join_room", roomId);
  }, [s.isConnected, roomId]);

  if (!s.isConnected) {
    return <p>Connecting...</p>;
  }

  // On join, server will respond with either `error` or `game_state`
  const { socket } = s;
  socket.on("error", (e) => {
    console.warn(e);
    setError(e);
  });

  socket.on("room_update", (room) => {
    setGameState(room);
  });

  const renderError = (e: Error) => {
    switch (e) {
      case Error.ROOM_NOT_FOUND:
        return `Oops! We couldn't find a room with the code "${roomId}".`;
      case Error.INVALID_ROOM_CODE:
        return `Oops! Looks like there's a typo in your room code. Room codes are 5 letters but you entered "${roomId}".`;
      case Error.ROOM_FULL:
        return `Sorry, room ${roomId} is already full.`;
      case Error.ROOM_ALREADY_EXISTS:
        return `Oops! Room "${roomId}" already exists.`;
      default:
        return "An unexpected error has occured.";
    }
  };

  if (error) {
    return (
      <CenteredCard>
        <h1>Error</h1>
        <p>{renderError(error)}</p>
        <button onClick={() => navigate(-1)} style={{ padding: "10px 15px" }}>
          Back
        </button>
      </CenteredCard>
    );
  }

  return <Page roomId={roomId}>{JSON.stringify(gameState)}</Page>;
}
export default Game;
