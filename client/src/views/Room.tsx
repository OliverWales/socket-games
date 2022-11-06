import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ellipses from "../components/Ellipses";
import Page from "../components/Page";
import useSocket from "../hooks/useSocket";
import Game from "./Game";
import { Room as RoomType, Error } from "../../../common/types";
import SimpleModal from "../components/SimpleModal";

function Room() {
  const s = useSocket();
  const { roomId } = useParams();

  const [room, setRoom] = useState<RoomType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // On load, request to join room
    if (!s.isConnected || !roomId) return;
    s.socket.emit("join_room", roomId);

    // On leave, notify server
    return () => {
      s.socket.emit("leave_room", roomId);
    };
  }, [s.isConnected, roomId]);

  if (!s.isConnected || !roomId) {
    console.log({ connected: s.isConnected, roomId, error });
    return (
      <Page>
        <SimpleModal
          body={
            <p>
              Loading
              <Ellipses />
            </p>
          }
        />
      </Page>
    );
  }

  // On join, server will respond with either `error` or `game_state`
  const { socket } = s;
  socket.on("error", (e) => {
    console.warn(e);
    setError(e);
  });

  socket.on("room_update", (room) => {
    setRoom(room);
  });

  return (
    <Page roomId={roomId}>
      <Game roomId={roomId} room={room} error={error} />
    </Page>
  );
}
export default Room;
