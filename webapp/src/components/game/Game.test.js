import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Game} from './Game';

describe('Game Component', () => {
    it('renders correctly', () => {
      render(<Game />);
      expect(screen.getByText(/Cargando pregunta.../i)).toBeInTheDocument();
    });
  
    it('calls startGame method on mount', () => {
      const startGameSpy = jest.spyOn(Game.prototype, 'startGame');
      render(<Game />);
      expect(startGameSpy).toHaveBeenCalled();
    });
  
    it('calls comprobarPregunta method on button click', () => {
      const comprobarPreguntaSpy = jest.spyOn(Game.prototype, 'comprobarPregunta');
      render(<Game />);
      fireEvent.click(screen.getByRole('button', { name: /.../i }));
      expect(comprobarPreguntaSpy).toHaveBeenCalled();
    });
  
    // Add more test cases as needed
  });