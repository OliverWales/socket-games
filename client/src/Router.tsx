import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import New from "./views/New";
import Room from "./views/Room";

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
      element: <Room />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Router;
