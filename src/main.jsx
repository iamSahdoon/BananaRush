import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Home } from "./pages/Home/Home.jsx";
import { Home } from "./page/Home.jsx";
import { LoginSignup } from "./page/LoginSignup";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./page/ErrorPage.jsx";
import { Login } from "./page/Login.jsx";
import { Signup } from "./page/Signup.jsx";
import { Difficulty } from "./page/Difficulty.jsx";
import { Game } from "./page/Game.jsx";
import { Ranking } from "./page/Ranking.jsx";
// import { Details } from "./pages/Details/Details.jsx";
import { Details } from "./page/Details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/LoginSignup",
    element: <LoginSignup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/difficulty",
    element: <Difficulty />,
  },
  {
    path: "/thegame",
    element: <Game />,
  },
  {
    path: "ranking",
    element: <Ranking />,
  },
  {
    path: "/details",
    element: <Details />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
