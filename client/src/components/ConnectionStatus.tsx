import useSocket from "../hooks/useSocket";
import Ellipses from "./Ellipses";

const ConnectionStatus = () => {
  const s = useSocket();

  return (
    <div style={{ padding: "10px" }}>
      {s.isConnected ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
        </div>
      ) : (
        <span>
          Connecting
          <Ellipses />
        </span>
      )}
    </div>
  );
};
export default ConnectionStatus;
