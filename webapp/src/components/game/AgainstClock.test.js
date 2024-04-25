import React from 'react';
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AgainstClock} from './AgainstClock';
import Game from "./Game";
import { MemoryRouter, Route } from 'react-router-dom';
import * as router from "react-router";
import "../../i18n";

jest.mock('../../services/game.service', () => ({
    startNewGame: () => Promise.resolve(""),
    nextQuestion: () => Promise.resolve({ title: 'Pregunta de prueba', awnsers: ['Respuesta 1', 'Respuesta 2', 'Respuesta 3', 'Respuesta 4'] }),
    awnser: () => Promise.resolve('Respuesta 1'),
    getEndTime: () => Promise.resolve(
        {
            end: 50,
            start: 0
        }
    ),
    getGameSettings: () => Promise.resolve({durationQuestion:50}),
    getNumberOfQuestions: () => Promise.resolve(10),
    getCurrentQuestion: () => Promise.resolve({ title: 'Pregunta actual', user_answer: 'Respuesta 1', answer: 'Respuesta 1' }),
}));

const navigate = jest.fn();
const locate = jest.fn();

describe("Game component", () => {
    beforeEach(() => {
        localStorage.setItem("token", "manolineldelpino");
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        jest.spyOn(router, 'useLocation').mockImplementation(() => locate)
    });

    test('renders component', async () => {
        await act(() => render(<AgainstClock tags={"tag"}/>))

        expect(screen.getByText(/Pregunta de prueba/i)).toBeInTheDocument();
    })
})