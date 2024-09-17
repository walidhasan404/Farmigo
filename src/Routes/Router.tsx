import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login/Login";
import RegisterPage from "../Pages/Authentication/Registration/Registration";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
  ]);