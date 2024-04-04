import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { isValidToken } from "../services/user.service";

export const PrivateRoute = ({ children }) =>
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => 
    {
        const verifyToken = async () => 
        {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) 
            {
                setIsAuthenticated(false);
                return;
            }
            
            try {
                const valid = await isValidToken(token);
                console.log(valid);
                setIsAuthenticated(valid);

            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    console.log(isAuthenticated);
    if (isAuthenticated)
        return children;

    localStorage.removeItem("token");

    return <Navigate to='/login' replace />;
}