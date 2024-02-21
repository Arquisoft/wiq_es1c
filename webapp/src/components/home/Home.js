import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const Home = () => 
{
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() =>
    {
        const token = localStorage.getItem('token');

        setLoggedIn(token !== undefined && token !== null);
    }, [loggedIn]);
    
    return (
        <>
        { !loggedIn
        ?
        ( 
            <Navigate to='/login' replace /> 
        )
        :
        (
            <h1 className="text-white text-5xl text-center">Pantalla del juego</h1>
        )}
        </>
    )
}
