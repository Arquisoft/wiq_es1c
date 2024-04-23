import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Ranking } from './Ranking';
import { MemoryRouter } from 'react-router-dom';
import "../../i18n";

jest.mock('../../services/user.service', () => (
{
    getRanking: () => Promise.resolve(
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
                    },
                ]
            }
        ]
    )
}));

describe('Game Component', () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",async () => 
    {
        await act(async () => render(<MemoryRouter><Ranking /></MemoryRouter>));

        expect(screen.getByText(/Clasificación/i)).toBeInTheDocument();
    });
    
});