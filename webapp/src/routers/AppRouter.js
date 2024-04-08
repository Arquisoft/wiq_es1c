import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../components/login/Login";
import AddUser from "../components/register/AddUser";
import Error404 from "../components/error/Error404";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRoute } from "./AuthRoute";
import { Home } from "../components/home/Home";
import Game from "../components/game/Game";
import { History } from "../components/history/History";
import {Profile} from "../components/profile/Profile";

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
        path: "/history",
        element: <PrivateRoute>
                    <History />
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
        element: <PrivateRoute>
                    <Game />
                </PrivateRoute>       
    },
    {

        path: "/profile",
        element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>   
    },    
    {
        path: "*",
        element: <Error404 />
    }
]);

export default router;