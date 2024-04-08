import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Profile } from './Profile';
import { MemoryRouter } from 'react-router-dom';


jest.mock('../../services/user.service', () => ({
    getCurrentUser: () => {
        return Promise.resolve("pepe");
    },
    getCreationDate: () => {
        return Promise.resolve("2024-04-06");
    },
    getHistory: () => Promise.resolve(
        [
          {
              id: "Game 1",
              createdAt: "2024-04-04T14:10:58.000",
              tags:"tag1,tag2",
              Questions: [
                  {title: "Pregunta1", onTime: true, answer: "A", user_answer: "Incorrecta1"},
                  {title: "Pregunta2", onTime: true, answer: "B", user_answer: "B"},
                  {title: "Pregunta3", onTime: true, answer: "C", user_answer: "C"},
                  {title: "Pregunta4", onTime: true, answer: "D", user_answer: "Incorrecta2"}
              ]
          },{
              id: "Game 2",
              createdAt: "2024-04-02T14:10:58.000",
              tags:"tag3,tag4,tag5",
              Questions: [
                  {title: "Pregunta5", onTime: true, answer: "A", user_answer: "Incorrecta1"},
                  {title: "Pregunta6", onTime: true, answer: "B", user_answer: "B"},
                  {title: "Pregunta7", onTime: true, answer: "C", user_answer: "Incorrecta2"},
                  {title: "Pregunta8", onTime: true, answer: "D", user_answer: "Incorrecta3"}
              ]
          }
        ]
      )
}));

describe("Profile component", () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));
    test("renders component",async () => {
        render(<MemoryRouter><Profile/></MemoryRouter>);
        
        await act(async () => {});

        expect(screen.getByText(/Usuario: /i)).toBeInTheDocument();
        expect(screen.getByText(/Lleva jugando desde:/i)).toBeInTheDocument();
        expect(screen.getByText(/Resultados última partida/i)).toBeInTheDocument();
        expect(screen.getByText(/Resultados generales/i)).toBeInTheDocument();

    });
    test("renders component with data",async () => {
        render(<MemoryRouter><Profile/></MemoryRouter>);
        
        await act(async () => {});

        expect(screen.getByText(/Usuario: pepe/i)).toBeInTheDocument();
        expect(screen.getByText(/Lleva jugando desde: 2024-04-06/i)).toBeInTheDocument();
        expect(screen.getByText(/Resultados última partida/i)).toBeInTheDocument();
        expect(screen.getByText(/50%/i)).toBeInTheDocument();
        expect(screen.getByText(/Resultados generales/i)).toBeInTheDocument();
        expect(screen.getByText(/37.5%/i)).toBeInTheDocument();

    });
})