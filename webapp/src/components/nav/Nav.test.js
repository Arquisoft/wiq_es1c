import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, BrowserRouter as Router  } from 'react-router-dom';
import { Nav } from './Nav';
import Swal from "sweetalert2";

jest.mock("sweetalert2");

describe("Nav component", () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",async () => {
        render(<MemoryRouter><Nav/></MemoryRouter>);
        
        await act(async () => {});

        expect(screen.getByText(/WIQ/i)).toBeInTheDocument();

    });

    test("logs out properly",async () => {
        const history = createMemoryHistory();

        render(<Router history={history}><Nav/></Router>);
    
        screen.getByTestId('logout').click();

        await act(async () => {});

        waitFor(()=>{
            expect(history.location.pathname).toBe('/login');
        });
    });

    test("opens menu properly",async () => {
        render(<MemoryRouter><Nav/></MemoryRouter>);
    
        screen.getByTestId('open-account-menu').click();

        await act(async () => {});

        waitFor(()=>{
            expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
            expect(screen.getByText(/Historial/i)).toBeInTheDocument();
        });
    });

    test("changes color",async () => {

        await act(async () => render(<MemoryRouter><Nav/></MemoryRouter>));


        await act(async () => screen.getByTestId("change-color").click());

        expect(screen.getByText("WIQ").getAttribute("style")).toContain("color");


    });

    test("shows alert when clicking home icon during game", async () => {
        Swal.fire = jest.fn(() => {
            return Promise.resolve(true);
        });
          
        render(<MemoryRouter initialEntries={['/game']}><Nav /></MemoryRouter>);

        screen.getByTestId("go-home").click()

        expect(Swal.fire).toHaveBeenCalled();
    });

    test("shows alert when clicking home icon during game", async () => {
        Swal.fire = jest.fn(() => {
            return Promise.resolve(true);
        });
          
        render(<MemoryRouter initialEntries={['/']}><Nav /></MemoryRouter>);

        screen.getByTestId("go-home").click()

        expect(Swal.fire).toHaveBeenCalledTimes(0);
    });

    test("goes to profile",async () => {
        const history = createMemoryHistory();

        render(<Router history={history}><Nav/></Router>);
    
        screen.getByTestId('open-account-menu').click();

        await act(async () => {});

        screen.getByTestId('go-profile').click();

        await act(async () => {});

        waitFor(()=>{
            expect(history.location.pathname).toBe('/profile');
        });
    });

    test("goes to History",async () => {
        const history = createMemoryHistory();

        render(<Router history={history}><Nav/></Router>);
    
        screen.getByTestId('open-account-menu').click();

        await act(async () => {});
        
        screen.getByTestId('go-history').click();

        await act(async () => {});

        waitFor(()=>{
            expect(history.location.pathname).toBe('/history');
        });
    });
});
