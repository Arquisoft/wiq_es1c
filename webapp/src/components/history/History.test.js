import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {History} from './History';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/user.service', () => ({
    getHistory: () => Promise.resolve(
      [
        {
          id: "Game 1",
          Questions: [
            {onTime: true, answer: "A", user_answer: "A"},
            {onTime: true, answer: "A", user_answer: "A"},
            {onTime: true, answer: "A", user_answer: "A"}
          ]
        },
        {
          id: "Game 2",
          Questions: [
            {onTime: true, answer: "A", user_answer: "A"},
            {onTime: true, answer: "A", user_answer: "A"},
            {onTime: true, answer: "A", user_answer: "A"}
          ]
        },
        {
          id: "Game 3",
          Questions: [
            {onTime: true, answer: "A", user_answer: "A"},
            {onTime: true, answer: "A", user_answer: "A"},
            {onTime: true, answer: "A", user_answer: "A"}
          ]
        },
      ]
    )
}));

describe('Game Component', () => {

  test("renders component",async () => {
    render(<MemoryRouter><History/></MemoryRouter>);
    
    await act(async () => {});

    expect(screen.getByText(/Game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Game 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Game 3/i)).toBeInTheDocument();

    expect(screen.getByText(/Juego/i)).toBeInTheDocument();
    expect(screen.getByText(/Acertadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Falladas/i)).toBeInTheDocument();
  });
});