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

    test("renders component",async () => 
    {
        await act(async () => render(<MemoryRouter><Ranking /></MemoryRouter>));

        waitFor(async () => {
            expect(screen.getByText(/Clasificación/i)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: user1/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('hitPercentage').click();
            
            expect(screen.getByText(/Porcentaje de aciertos/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('numberOfCorrectQuestions').click();
            
            expect(screen.getByText(/Número de preguntas correctas/i)).toBeInTheDocument();

            screen.getByTestId('select-sort-by').click();
            await act(async () => {});
            screen.getByTestId('numberOfPlays').click();
            
            expect(screen.getByText(/Cantidad de partidas/i)).toBeInTheDocument();
        });
    });
    
});