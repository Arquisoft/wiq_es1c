import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) =>
{
    const token = localStorage.getItem('token');

    return (token === undefined || token === null) ? children : <Navigate to='/home' replace />;
}