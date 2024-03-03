// src/components/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';


jest.mock('../../services/user.service', () => ({
    getCurrentUser: jest.fn(() => {
        return Promise.resolve("pepe");
    }),
}));



describe("Home component", () => {
    beforeAll(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",() => {
        render(<MemoryRouter><Home/></MemoryRouter>);

        expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();


    });

    test("loads username", () => {
        render(<MemoryRouter><Home/></MemoryRouter>);

        expect(screen.getByText(/pepe/i).toBeInTheDocument());
    });

    test("button redirects", async () => {
        render(<MemoryRouter><Home/></MemoryRouter>);
        const button = screen.getByText("Jugar");
        fireEvent.submit(button);
        await waitFor(() => expect(screen.getByText(/Bienvenido/i)).not.toBeInTheDocument());
    })


});
