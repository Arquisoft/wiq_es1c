import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Ranking } from './Ranking';
import { MemoryRouter } from 'react-router-dom';
import "../../i18n";

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
                },
                {
                    user_id: "2",
                    numberOfQuestions: 1,
                    Questions: [
                        {
                            answer: 'abc',
                            user_answer: 'abc'
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
            },
            {
                hitsPercentage: 100,
                user: {
                    id: "2",
                    name: "user2"
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
            },
            {
                correctsAnswer: 1,
                user: {
                    id: "2",
                    name: "user2"
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
            },
            {
                numberOfPlays: 1,
                user: {
                    id: "2",
                    name: "user2"
                }
            }
        ]
    )
}));

describe('Game Component', () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",async () => 
    {
        await act(async () => render(<MemoryRouter><Ranking /></MemoryRouter>));

        waitFor(async () => {
            expect(screen.getByText(/Clasificación/i)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: user2/i)).toBeInTheDocument();
            expect(screen.getByText(/Acierto: 50 %/i));
            expect(screen.getByText(/Acierto: 100 %/i));
            expect(screen.getByTestId(/cup-1/i)).toBeInTheDocument();
            expect(screen.getByTestId(/cup-2/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('hitPercentage').click();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Acierto: 50 %/i));
            
            expect(screen.getByText(/Porcentaje de aciertos/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('numberOfCorrectQuestions').click();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: user2/i)).toBeInTheDocument();
            expect(screen.getByText(/Preguntas correctas: 1/i));
            expect(screen.getByText(/Preguntas correctas: 1/i));
            
            expect(screen.getByText(/Número de preguntas correctas/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('numberOfPlays').click();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: user2/i)).toBeInTheDocument();
            expect(screen.getByText(/Partidas jugadas: 2/i));
            expect(screen.getByText(/Partidas jugadas: 1/i));
            
            expect(screen.getByText(/Cantidad de partidas/i)).toBeInTheDocument();

            await act(async () => 
            {
                sort({ target: { value: /Porcentaje de aciertos/i } });
                await Promise.resolve();
            });
            expect(sortByHitPercentage).toHaveBeenCalledWith(ranking);

            await act(async () => 
            {
                sort({ target: { value: /Número de preguntas correctas/i } });
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