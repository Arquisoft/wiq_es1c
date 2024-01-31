import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";

import Login from "../components/login/Login";
import AddUser from "../components/register/AddUser";
import Error from "../components/error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Error />
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