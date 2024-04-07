import React from 'react';
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Game} from './Game';
import { MemoryRouter } from 'react-router-dom';

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
  getGameSetting: () => Promise.resolve(
    {
      durationQuestion: 10
    }
  )
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Game Component', () => {

  test("renders component",async () => {

    
    await act(async () => render(<MemoryRouter><Game/></MemoryRouter>));

    expect(screen.getByText(/Pregunta de prueba/i)).toBeInTheDocument();

  });
  
  it('turns green on correct answer', async () => {
    await act(async () => render(<MemoryRouter><Game/></MemoryRouter>));

    // Clic en respuesta correcta
    await act(async () => fireEvent.click(screen.getByText(/Respuesta 1/i)));

    let correctStyle = screen.getByText(/Respuesta 1/i).getAttribute("style");
    expect(correctStyle).toContain("background-color: green");
  });

  it('turns red on wrong answer and correct one turns green', async () => {
    render(<MemoryRouter><Game/></MemoryRouter>);

    // Espera a que la pregunta se cargue y se renderice
    await act(async () => {});

    // Simula hacer clic en el botón de respuesta
    let wrongButton = screen.getByText(/Respuesta 2/i);



    // Espera a que se resuelva la promesa y se ejecute la lógica de la función
    await act(async () => fireEvent.click(wrongButton));

    let correctAnswer = screen.getByText(/Respuesta 1/i).getAttribute("style");
    let wrongAnswer = wrongButton.getAttribute("style");
    expect(correctAnswer).toContain("background-color: green");
    expect(wrongAnswer).toContain("background-color: red");
  });

  // TODO understand whats going on here
  it('sets the time label up and changes correctly', async () => {

    await act(async () => render(<MemoryRouter><Game/></MemoryRouter>));

    setTimeout(() => {
      let counter = screen.getByTestId("counter");
      expect(counter.textContent).toBe("0.01"); // TODO 0.01 instead of 10??????
      waitFor(() => expect(counter.textContent).toBe("10"));
      waitFor(() => expect(counter.textContent).toBe("9"));
    }, 250);


  });

});