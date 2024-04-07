// src/components/Login.test.js
import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, BrowserRouter as Router  } from 'react-router-dom';
import { Home } from './Home';


jest.mock('../../services/user.service', () => ({
    getCurrentUser: () => {
        return Promise.resolve("pepe");
    },
}));


describe("Home component", () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",async () => {
        render(<MemoryRouter><Home/></MemoryRouter>);
        
        await act(async () => {});

        expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();

    });

    test("loads username", async () => {
        render(<MemoryRouter><Home/></MemoryRouter>);

        await act(async () => {});

        expect(screen.getByText(/pepe/i)).toBeInTheDocument();
    });

    test("button redirects", async () => {
        const history = createMemoryHistory();

        render(<Router history={history}><Home/></Router>);
    
        fireEvent.click(screen.getByText('JUGAR'));
        
        await act(async () => {});

        waitFor(()=>{
            expect(history.location.pathname).toBe('/game');
        });
    })

    test("page redirects when not logged in", async () => {
        localStorage.setItem("token", undefined);

        const history = createMemoryHistory();

        render(<Router history={history}><Home/></Router>);
        
        await act(async () => {});

        waitFor(()=>{
            expect(history.location.pathname).toBe('/login');
        });
    })
});
