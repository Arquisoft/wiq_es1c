import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Settings } from './Settings';
import "../../i18n";

jest.mock('../../services/game.service', () => ({
  getGameSettings: () => Promise.resolve({ durationQuestion: 30, numberOfQuestions: 10 }),
  setGameSettings: jest.fn()
}));

describe("Settings component", () => {
  beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

  test("renders component", async () => {
    render(<MemoryRouter><Settings /></MemoryRouter>);
    expect(screen.getByText(/Configuración/i)).toBeInTheDocument();
  });

  test("displays correct number of questions", async () => {
    render(<MemoryRouter><Settings /></MemoryRouter>);
    await act(async () => {})
    expect(screen.getByText("10")).toBeInTheDocument(); // Initial value from mock data
  });

  test("changes number of questions", async () => {
    render(<MemoryRouter><Settings /></MemoryRouter>);
    const slider = screen.getByRole('slider', { name: /Numero de preguntas/i });
    fireEvent.change(slider, { target: { value: 20 } });
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("displays correct duration of questions", async () => {
    render(<MemoryRouter><Settings /></MemoryRouter>);
    await act(async () => {})
    expect(screen.getByText("30")).toBeInTheDocument(); // Initial value from mock data
  });

  test("changes duration of questions", async () => {
    render(<MemoryRouter><Settings /></MemoryRouter>);
    const slider = screen.getByRole('slider', { name: /Duracion de las preguntas/i });
    fireEvent.change(slider, { target: { value: 45 } });
    expect(screen.getByText("45")).toBeInTheDocument();
  });
});
