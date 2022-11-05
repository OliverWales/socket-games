import { FC, ReactNode } from "react";
import ConnectionStatus from "./ConnectionStatus";
import GitHubLink from "./GitHubLink";

const Page: FC<{
  children: ReactNode;
  roomId?: string;
}> = ({ children, roomId }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ConnectionStatus />
      {roomId ? <h2 style={{ margin: "10px" }}>{roomId}</h2> : null}
      <GitHubLink />
    </div>
    {children}
  </div>
);
export default Page;
