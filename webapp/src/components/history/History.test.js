import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {History} from './History';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/user.service', () => ({
    getHistory: () => Promise.resolve(
      [
        {
            id: "Game 1",
            createdAt: "2024-04-04T14:10:58.000",
            tags:"tag1,tag2",
            Questions: [
                {title: "Pregunta1", onTime: true, answer: "A", user_answer: "Incorrecta1"},
                {title: "Pregunta2", onTime: false, answer: "B", user_answer: "B"},
                {title: "Pregunta3", onTime: true, answer: "C", user_answer: "Incorrecta2"},
                {title: "Pregunta4", onTime: true, answer: "D", user_answer: "Incorrecta3"}
            ]
        },{
            id: "Game 2",
            createdAt: "2024-04-02T14:10:58.000",
            tags:"tag3,tag4,tag5",
            Questions: [
                {title: "Pregunta5", onTime: true, answer: "A", user_answer: "Incorrecta1"},
                {title: "Pregunta6", onTime: false, answer: "B", user_answer: "B"},
                {title: "Pregunta7", onTime: true, answer: "C", user_answer: "Incorrecta2"},
                {title: "Pregunta8", onTime: true, answer: "D", user_answer: "Incorrecta3"}
            ]
        }
      ]
    )
}));

describe('Game Component', () => {

  test("renders component and the games",async () => {
        await act(async () => render(<MemoryRouter><History/></MemoryRouter>));

        expect(screen.getByText(/4\/4\/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/2\/4\/2024/i)).toBeInTheDocument();

        expect(screen.getByText(/Fecha/i)).toBeInTheDocument();
        expect(screen.getByText(/Acertadas/i)).toBeInTheDocument();
        expect(screen.getByText(/Falladas/i)).toBeInTheDocument();
        expect(screen.getByText(/% de aciertos/i)).toBeInTheDocument();
  });

    test("renders component and the games",async () => {
        await act(async () => render(<MemoryRouter><History/></MemoryRouter>));

        expect(screen.getByText(/4\/4\/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/2\/4\/2024/i)).toBeInTheDocument();

        expect(screen.getByText(/Fecha/i)).toBeInTheDocument();
        expect(screen.getByText(/Acertadas/i)).toBeInTheDocument();
        expect(screen.getByText(/Falladas/i)).toBeInTheDocument();
        expect(screen.getByText(/% de aciertos/i)).toBeInTheDocument();
    });
});