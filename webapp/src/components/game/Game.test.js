import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Game} from './Game';

jest.mock('../../services/game.service', () => ({
  startNewGame: jest.fn(),
  nextQuestion: jest.fn().mockResolvedValue({ title: 'Pregunta de prueba', awnsers: ['Respuesta 1', 'Respuesta 2', 'Respuesta 3', 'Respuesta 4'] }),
  awnser: jest.fn().mockResolvedValue('Respuesta correcta'),
}));

describe('Game Component', () => {

  test("renders component",async () => {
    render(<Game/>);
    
    await act(async () => {});

    expect(screen.getByText(/Cargando pregunta/i)).toBeInTheDocument();

  });
  
  it('shows alert on button click', async () => {
    render(<Game />);

    // Espera a que la pregunta se cargue y se renderice
    await screen.findByText(/Pregunta de prueba/i);

    // Simula hacer clic en el botón de respuesta
    fireEvent.click(screen.getByText(/Respuesta 1/i));

    // Espera a que se resuelva la promesa y se ejecute la lógica de la función
    await screen.findByText(/Pregunta de prueba/i);

    // Verifica que se haya llamado a la función de respuesta con el valor correcto
    expect(await screen.findByText(/Respuesta correcta/i)).toBeInTheDocument();

    // Verifica que se haya mostrado la alerta adecuada
    expect(window.alert).toHaveBeenCalledWith('Pregunta acertada');
  });
});