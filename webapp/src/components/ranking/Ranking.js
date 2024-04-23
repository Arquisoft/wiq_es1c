import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { 
    getRanking, 
    sortByHitPercentage, 
    sortByNumberOfCorrectQuestions, 
    sortByNumberOfPlays
} from '../../services/ranking.service';
import { Nav } from '../nav/Nav';


export const Ranking = () =>
{
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [ranking, setRanking] = useState(undefined);
    const [sortRanking, setSortRanking] = useState(undefined);
    const [sortBy, setSortBy] = useState('');

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

    const sort = (by) =>
    {
        setSortBy(by.target.value);

        if (sortBy === t('Ranking.hitPercentage'))
            sortByHitPercentage(ranking).then(data => setSortRanking(data));
        else if (sortBy === t('Ranking.numberOfCorrectQuestions'))
            sortByNumberOfCorrectQuestions(ranking).then(data => setSortRanking(data));
        else
            sortByNumberOfPlays(ranking).then(data => setSortRanking(data));
    }

    return (
        <div>
            <Nav />
            { sortRanking === undefined ? (
                <div className='text-white'>Cargando...</div>
            ) : (
                <>
                    <h1 className='text-white text-center text-5xl mt-5 mb-4'>{ t('Ranking.title') }</h1>

                    <div className='flex justify-end mr-5' style={{ outline: 'none' }}>
                        <div className='bg-white rounded-xl p-2 w-1/5'>
                            <FormControl fullWidth>
                                <InputLabel>{ t('Ranking.sort') }</InputLabel>
                                <Select
                                    value={ sortBy }
                                    label={ t('Ranking.sort') }
                                    onChange={sort}
                                >
                                    <MenuItem value={ t('Ranking.hitPercentage') }>{ t('Ranking.hitPercentage') }</MenuItem>
                                    <MenuItem value={ t('Ranking.numberOfCorrectQuestions') }>{ t('Ranking.numberOfCorrectQuestions') }</MenuItem>
                                    <MenuItem value={ t('Ranking.numberOfPlays') }>{ t('Ranking.numberOfPlays') }</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        { sortRanking.map((rank, index) =>
                            <div key={ rank.user.id } className='flex justify-center items-center text-white text-center rounded-full bg-violet-500 p-6 w-4/5 md:w-5/12 lg:w-2/6 mb-4'>
                                <div>
                                    <span className='text-lg lg:text-3xl font-bold'>{ t('Ranking.user') }: { rank.user.name }</span>
                                    <br />
                                    <span className='text-lg lg:text-3xl'>{ t('Ranking.hit') }: { rank.hitsPercentage } %</span>
                                </div>

                                { ( index === 0 ) ? <span><EmojiEventsIcon fontSize='large' className='text-yellow-400 ml-5' /></span> : <span></span> }
                                { ( index === 1 ) ? <span><EmojiEventsIcon fontSize='large' className='text-gray-400 ml-5' /></span> : <span></span> }
                                { ( index === 2 ) ? <span><EmojiEventsIcon fontSize='large' className='text-orange-600 ml-5' /></span> : <span></span> }
                            </div>
                        ) }
                    </div>
                </>
            ) }
        </div>
    );
}