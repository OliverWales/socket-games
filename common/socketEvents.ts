import { Error, Room, Game } from "./types";

export interface ServerToClientEvents {
  error: (type: Error) => void;
  room_update: (gameState: Room) => void;
  session_id: (id: string) => void;
}

export interface ClientToServerEvents {
  create_room: (roomId: string, game: Game) => void;
  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
  make_game_move: (roomId: string, move: number) => void;
}
