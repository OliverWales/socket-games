import { Error, Room } from "../../../common/types";
import { MAX_CAPACITY } from "../../../common/constants";
import Ellipses from "../components/Ellipses";
import SimpleModal from "../components/SimpleModal";
import NumberInARow from "./NumberInARow";
import { useNavigate } from "react-router-dom";

function Game({
  roomId,
  room,
  error,
}: {
  roomId: string;
  room: Room | null;
  error: Error | null;
}) {
  const navigate = useNavigate();

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

  if (error || !room) {
    return (
      <SimpleModal heading="Error" body={<p>{renderError(error ?? -1)}</p>} />
    );
  }

  if (room.sessionIds.length < MAX_CAPACITY[room.gameState.type]) {
    return room.gameState.mode.type === "not_started" ? (
      <SimpleModal
        body={
          <p>
            Waiting for another player to join
            <Ellipses />
          </p>
        }
      />
    ) : (
      <SimpleModal
        body={
          <p>
            Looks like the other player left
            <Ellipses />
          </p>
        }
        button={{ onClick: () => navigate("/"), text: "Leave" }}
      />
    );
  }

  return <NumberInARow room={room} />;
}
export default Game;
