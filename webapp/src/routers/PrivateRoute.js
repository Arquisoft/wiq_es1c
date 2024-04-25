import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { isValidToken } from "../services/user.service";

export const PrivateRoute = ({ children }) =>
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => 
    {
        const verifyToken = async () => 
        {
            const token = localStorage.getItem('token');
            
            if (!token) 
            {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }
            
            try {
                const valid = await isValidToken(token);
                
                setIsAuthenticated(valid);

            } catch (error) {
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        verifyToken();
    }, []);

    if (isLoading)
        return <></>;

    if (isAuthenticated)
        return children;

    localStorage.removeItem("token");

    return <Navigate to='/login' replace />;
}