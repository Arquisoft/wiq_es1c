import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../components/login/Login";
import AddUser from "../components/register/AddUser";
import Error404 from "../components/error/Error404";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRoute } from "./AuthRoute";
import { Home } from "../components/home/Home";
import Game from "../components/game/Game";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/home",
        element: <PrivateRoute>
                    <Home />
                </PrivateRoute> 
    },
    {
        path: "/login",
        element: <AuthRoute>
                    <Login />
                </AuthRoute>
    },
    {
        path: "/register",
        element: <AuthRoute>
                    <AddUser />
                </AuthRoute>
    },
    {
        path: "/game",
        element: <AuthRoute>
                    <Game />
                </AuthRoute>       
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