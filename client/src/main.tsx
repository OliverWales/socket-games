import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Router from "./Router";
import { SocketProvider } from "./hooks/useSocket";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <Router />
    </SocketProvider>
  </React.StrictMode>
);
