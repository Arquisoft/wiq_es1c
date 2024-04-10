import React from 'react';
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import SuddenDeath from "./SuddenDeath";

jest.mock('../../services/game.service', () => ({
    startNewGame: () => Promise.resolve(""),
    nextQuestion: () => Promise.resolve({ title: 'Pregunta de prueba', awnsers: ['Respuesta 1', 'Respuesta 2', 'Respuesta 3', 'Respuesta 4'] }),
    awnser: () => Promise.resolve('Respuesta 1'),
    getEndTime: () => Promise.resolve(
        {
            end: 10,
            start: 0
        }
    ),
    getGameSettings: () => Promise.resolve({durationQuestion:10})
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('SuddenDeath Component', () => {

    test("renders component",async () => {
        await act(async () => render(
            <MemoryRouter>
                <SuddenDeath/>
            </MemoryRouter>)
        );

        expect(screen.getByText(/Pregunta de prueba/i)).toBeInTheDocument();

    });

    it('turns green on correct answer', async () => {
        await act(async () => render(
            <MemoryRouter>
                <SuddenDeath/>
            </MemoryRouter>)
        );

        // Clic en respuesta correcta
        await act(async () => await fireEvent.click(screen.getByText(/Respuesta 1/i)));

        let correctStyle = screen.getByText(/Respuesta 1/i).getAttribute("class");
        expect(correctStyle).toContain("bg-green-700 w-full containedButton text-black dark:text-white font-mono");
    });

    it('turns red on wrong answer and correct one turns green', async () => {
        await act(async () => render(
            <MemoryRouter>
                <SuddenDeath/>
            </MemoryRouter>)
        );

        // Simula hacer clic en el botón de respuesta
        let wrongButton = screen.getByText(/Respuesta 2/i);

        // Espera a que se resuelva la promesa y se ejecute la lógica de la función
        await act(async () => fireEvent.click(wrongButton));

        let correctAnswer = screen.getByText(/Respuesta 1/i).getAttribute("class");
        let wrongAnswer = wrongButton.getAttribute("class");
        expect(correctAnswer).toContain("bg-green-700 w-full containedButton text-black dark:text-white font-mono");
        expect(wrongAnswer).toContain("bg-red-700 w-full containedButton text-black dark:text-white font-mono");
    });


    it('finishes the game when a question is failed', async () => {
        await act(async () => render(
            <MemoryRouter>
                <SuddenDeath/>
            </MemoryRouter>)
        );

        // Simula hacer clic en el botón de respuesta
        let wrongButton = screen.getByText(/Respuesta 2/i);

        // Espera a que se resuelva la promesa y se ejecute la lógica de la función
        await act(async () => fireEvent.click(wrongButton));


        await waitFor(() => expect(screen.getByText(/El juego ha finalizado!/i)).toBeInTheDocument(), { timeout: 2000});
    });

    it('sets the time label up and changes correctly', async () => {
        await act(async () => render(
            <MemoryRouter>
                <SuddenDeath/>
            </MemoryRouter>)
        );

        await act(async () => render(
            <MemoryRouter>
                <SuddenDeath/>
            </MemoryRouter>)
        );

        setTimeout(() => {
            let counter = screen.getByTestId("counter");
            expect(counter.textContent).toBe("0.01");
            waitFor(() => expect(counter.textContent).toBe("10"));
            waitFor(() => expect(counter.textContent).toBe("9"));
        }, 250);


    });

});