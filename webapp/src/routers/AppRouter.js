import { createBrowserRouter } from "react-router-dom";

import Login from "../components/login/Login";
import AddUser from "../components/register/AddUser";
import Error404 from "../components/error/Error404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1 className="text-white text-5xl text-center">Pantalla del juego</h1>,
        errorElement: <Error404 />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <AddUser />
    }
]);

export default router;