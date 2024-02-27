import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../components/login/Login";
import AddUser from "../components/register/AddUser";
import Error404 from "../components/error/Error404";
import Game from "../components/game/Game";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/home",
        element: <h1 className="text-white text-5xl text-center">Pantalla del juego</h1>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <AddUser />
    },
    {
        path: "/game",
        element: <Game />
    },
    {
        path: "*",
        element: <Error404 />
    }
]);

export default router;