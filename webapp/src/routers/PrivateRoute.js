import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) =>
{
    const token = localStorage.getItem('token');

    return (token === undefined || token === null) ? <Navigate to='/login' replace /> : children;
}