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

const SocketContext = createContext<
  | {
      socket: Socket;
      isConnected: boolean;
    }
  | { isConnected: false }
>({ isConnected: false });

const useInitSocket = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { socket, isConnected };
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
