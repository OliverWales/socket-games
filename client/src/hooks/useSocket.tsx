import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useMemo,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../common/socketEvents";

const SESSION_ID_KEY = "socket_games_session_id";

type Session =
  | {
      isConnected: true;
      sessionId: string;
      socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    }
  | { isConnected: false };

const SocketContext = createContext<Session>({ isConnected: false });

const useInitSocket = (): Session => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    useMemo(() => {
      const sessionId = localStorage.getItem(SESSION_ID_KEY);
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const serverPort = import.meta.env.VITE_SERVER_PORT;

      return io(
        serverUrl
          ? `${serverUrl}:${serverPort ?? 3000}`
          : "http://localhost:3000",
        sessionId ? { query: { sessionId } } : undefined
      );
    }, []);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem(SESSION_ID_KEY) ?? undefined
  );

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("session_id", (id) => {
      localStorage.setItem(SESSION_ID_KEY, id);
      setSessionId(id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return isConnected && !!socket && !!sessionId
    ? {
        isConnected: true,
        sessionId,
        socket,
      }
    : { isConnected: false };
};

export const SocketProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const socket = useInitSocket();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default function useSocket() {
  return useContext(SocketContext);
}
