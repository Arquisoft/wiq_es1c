import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
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
  )
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Game Component', () => {

  test("renders component",async () => {
    render(<MemoryRouter><Game/></MemoryRouter>);
    
    await act(async () => {});

    expect(screen.getByText(/Pregunta de prueba/i)).toBeInTheDocument();

  });
  
  it('shows alert on button click', async () => {
    render(<MemoryRouter><Game/></MemoryRouter>);

    // Espera a que la pregunta se cargue y se renderice
    await act(async () => {});

    // Simula hacer clic en el botón de respuesta
    fireEvent.click(screen.getByText(/Respuesta 1/i));

    // Espera a que se resuelva la promesa y se ejecute la lógica de la función
    await act(async () => {});

    //TODO: Fix this!
  });
});