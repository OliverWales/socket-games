import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./views/Game";
import Home from "./views/Home";
import New from "./views/New";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/new",
      element: <New />,
    },
    {
      path: "/:roomId",
      element: <Game />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Router;
