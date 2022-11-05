import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSocket from "./useSocket";

function Game() {
  const s = useSocket();
  const { roomId } = useParams();

  useEffect(() => {
    if (!s.isConnected) return;

    console.log("HERE");

    s.socket.emit("join_room", roomId);
  }, [s.isConnected]);

  if (!s.isConnected) {
    return <p>Connecting...</p>;
  }

  return (
    <>
      <h1>Hello, World!</h1>
      <p>Room ID: {roomId}</p>
      <p>My ID: {s.socket.id}</p>
    </>
  );
}
export default Game;
