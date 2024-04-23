import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Ranking } from './Ranking';
import { MemoryRouter } from 'react-router-dom';
import "../../i18n";

jest.mock('some-i18n-library', () => ({
    t: jest.fn(),
}));

jest.mock('../../services/user.service', () => (
{
    getUsers: () => Promise.resolve(
        [
            {
                id: "1",
                name: "user1"
            }
        ]
    ),
    getUser: () => Promise.resolve(
        {
            id: "1",
            name: "user1"
        }
    ),
    getHistoryByUser: () => Promise.resolve(
        [
            {
                user_id: "1",
                numberOfQuestions: 2,
                Questions: [
                    {
                        answer: 'abc',
                        user_answer: 'abc'
                    },
                    {
                        answer: 'abc',
                        user_answer: '123'
                    }
                ]
            }
        ]
    )
}));

jest.mock('../../services/ranking.service.js', () => (
{
    getRanking: () => Promise.resolve(
        [
            [
                {
                    user_id: "1",
                    numberOfQuestions: 2,
                    Questions: [
                        {
                            answer: 'abc',
                            user_answer: 'abc'
                        },
                        {
                            answer: 'abc',
                            user_answer: '123'
                        }
                    ]
                }
            ]
            
        ]
    ),
    sortByHitPercentage: () => Promise.resolve(
        [
            {
                hitsPercentage: 50,
                user: {
                    id: "1",
                    name: "user1"
                }
            }
        ]
    ),
    sortByNumberOfCorrectQuestions: () => Promise.resolve(
        [
            {
                correctsAnswer: 1,
                user: {
                    id: "1",
                    name: "user1"
                }
            }
        ]
    ),
    sortByNumberOfPlays: () => Promise.resolve(
        [
            {
                numberOfPlays: 2,
                user: {
                    id: "1",
                    name: "user1"
                }
            }
        ]
    )
}));

describe('Game Component', () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));
    t.mockReturnValue('');

    test("renders component",async () => 
    {
        await act(async () => render(<MemoryRouter><Ranking /></MemoryRouter>));

        waitFor(async () => {
            expect(screen.getByText(/Clasificación/i)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Acierto: 50 %/i));
            expect(screen.getByTestId(/cup-1/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('hitPercentage').click();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Acierto: 50 %/i));
            
            expect(screen.getByText(t('Ranking.hitPercentage'))).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('numberOfCorrectQuestions').click();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Preguntas correctas: 1/i));
            
            expect(screen.getByText(t('Ranking.numberOfCorrectQuestions'))).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('numberOfPlays').click();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Partidas jugadas: 2/i));
            
            expect(screen.getByText(t('Ranking.numberOfPlays'))).toBeInTheDocument();

            await act(async () => 
            {
                sort({ target: { value: t('Ranking.hitPercentage') } });
                await Promise.resolve();
            });
            expect(sortByHitPercentage).toHaveBeenCalledWith(ranking);

            await act(async () => 
            {
                sort({ target: { value: t('Ranking.numberOfCorrectQuestions') } });
                await Promise.resolve(); 
            });
            expect(sortByNumberOfCorrectQuestions).toHaveBeenCalledWith(ranking);

            await act(async () => 
            {
                sort({ target: { value: 'otraOpcion' } }); 
                await Promise.resolve(); 
            });
            expect(sortByNumberOfPlays).toHaveBeenCalledWith(ranking);
        });
    });
    
});