import React , { useEffect, useState }  from 'react';
import { getCurrentUser, getCreationDate } from "../../services/user.service";
import { Nav } from '../nav/Nav';

export const Profile = () =>{

    const [username, setUsername] = useState("No identificado");
    const [creationDate,setCreationDate] = useState();

    useEffect(() => {
        const fetchUserName = async () => {
            const user = await getCurrentUser();
            setUsername(user);
        };
        fetchUserName();
    }, []);

    useEffect(() => {
        const fetchCreationDate = async () => {
            const creationDate = await getCreationDate();
            setCreationDate(creationDate);
        };
        fetchCreationDate();
    }, []);

    return (
        <>
        <Nav/>
        <p>{username}</p>
        <p>{creationDate}</p>
        </>
    )
}