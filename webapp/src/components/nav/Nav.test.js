import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, BrowserRouter as Router  } from 'react-router-dom';
import { Nav } from './Nav';


describe("Home component", () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",async () => {
        render(<MemoryRouter><Nav/></MemoryRouter>);
        
        await act(async () => {});

        expect(screen.getByText(/WIQ/i)).toBeInTheDocument();

    });

    test("logs out properly",async () => {
        const history = createMemoryHistory();

        render(<Router history={history}><Nav/></Router>);
    
        await act( async () => {
            await fireEvent.click(screen.getByTestId('logout'));
        });

        await act(async () => {});

        waitFor(()=>{
            expect(history.location.pathname).toBe('/login');
        });
    });

    test("opens menu properly",async () => {
        render(<MemoryRouter><Nav/></MemoryRouter>);
    
        fireEvent.click(screen.getByTestId('open-account-menu'));

        await act(async () => {});

        waitFor(()=>{
            expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
            expect(screen.getByText(/Historial/i)).toBeInTheDocument();
        });
    });
});
