import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import { getRanking, sortByHitPercentage } from '../../services/ranking.service';
import { Nav } from '../nav/Nav';

export const Ranking = () =>
{
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [ranking, setRanking] = useState(undefined);
    const [sortRanking, setSortRanking] = useState(undefined);

    useEffect(() =>
    {
        if ( loading )
        {
            getRanking().then( data => setRanking(data) );
            setLoading(false);
        }
    }, []);

    useEffect(() =>
    {
        if ( ranking !== undefined )
            sortByHitPercentage(ranking).then(data => setSortRanking(data));
    }, [ranking]);

    return (
        <div>
            <Nav />
            { sortRanking === undefined ? (
                <div className='text-white'>Cargando...</div>
            ) : (
                <>
                    { console.log(sortRanking) }
                </>
            ) }
        </div>
    );
}