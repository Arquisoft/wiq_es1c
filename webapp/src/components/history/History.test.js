import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {History} from './History';

jest.mock('../../services/user.service', () => ({
    getHistory: () => ""
}));

describe('Game Component', () => {

  test("renders component",async () => {
    render(<History/>);
    
    await act(async () => {});

    expect(screen.getByText(/Juego/i)).toBeInTheDocument();
    expect(screen.getByText(/Acertadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Falladas/i)).toBeInTheDocument();
  });
});