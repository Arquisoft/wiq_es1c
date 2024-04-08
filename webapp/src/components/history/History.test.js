import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
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
                {title: "Pregunta3", onTime: true, answer: "C", user_answer: "C"},
                {title: "Pregunta4", onTime: true, answer: "D", user_answer: "Incorrecta2"}
            ]
        },{
            id: "Game 2",
            createdAt: "2024-05-05T14:10:58.000",
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
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

  test("renders component and the games",async () => {
        await act(async () => render(<MemoryRouter><History/></MemoryRouter>));

        expect(screen.getByText(/4\/4\/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/5\/5\/2024/i)).toBeInTheDocument();

        expect(screen.getByText(/Fecha/i)).toBeInTheDocument();
        expect(screen.getByText(/Acertadas/i)).toBeInTheDocument();
        expect(screen.getByText(/Falladas/i)).toBeInTheDocument();
        expect(screen.getByText(/% de aciertos/i)).toBeInTheDocument();
  });

    test("when you click a game, it shows its questions",async () => {
        await act(async () => render(<MemoryRouter><History/></MemoryRouter>));
        let game1 = screen.getByText(/4\/4\/2024/i).parentElement.children[0].children[0];

        await act(async () => fireEvent.click(game1));

        expect(screen.getByText("Pregunta")).toBeInTheDocument();
        expect(screen.getByText(/Respuesta correcta/i)).toBeInTheDocument();
        expect(screen.getByText(/Tu respuesta/i)).toBeInTheDocument();
        expect(screen.getByText("Correcta")).toBeInTheDocument();

        let questions = screen.getAllByTestId("question");
        expect(questions.length).toBe(4);

        expect(screen.getByText(/Pregunta1/i)).toBeInTheDocument();
        expect(screen.getByText(/Pregunta2/i)).toBeInTheDocument();
        expect(screen.getByText(/Pregunta3/i)).toBeInTheDocument();
        expect(screen.getByText(/Pregunta4/i)).toBeInTheDocument();
    });

    test("the row contains the correct info", async () => {
        await act(async () => render(<MemoryRouter><History/></MemoryRouter>));
        let game1 = screen.getByText(/4\/4\/2024/i).parentElement.children[0].children[0];

        await act(async () => fireEvent.click(game1));

        let questions = screen.getAllByTestId("question");

        expect(questions[0].children[0].textContent).toBe("Pregunta1");
        expect(questions[0].children[1].textContent).toBe("A");
        expect(questions[0].children[2].textContent).toBe("Incorrecta1");
        expect(questions[0].children[3].children[0].getAttribute("data-testid")).toBe("CancelIcon");

        expect(questions[1].children[3].children[0].getAttribute("data-testid")).toBe("CancelIcon");
        expect(questions[2].children[3].children[0].getAttribute("data-testid")).toBe("CheckCircleIcon");
    });
});