// src/components/Login.test.js
import React from 'react';
import {render, screen, act, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Home } from './Home';
import * as router from 'react-router';



jest.mock('../../services/user.service', () => ({
    getCurrentUser: () => {
        return Promise.resolve("pepe");
    },
}));

jest.mock('../../services/question.service', () => ({
    getTags: () => {
        return Promise.resolve(["a","b","c"]);
    },
}));

const navigate = jest.fn();

describe("Home component", () => {
    beforeEach(() => {
        localStorage.setItem("token", "manolineldelpino");
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    });

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
    
        screen.getByText('JUGAR').click();
        
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


    test("renders tag modal", async () => {
        await act(async () => render(<Router history={history}><Home/></Router>));

        await act(async () => fireEvent.click(screen.getByText("Elige las tags")));

        expect(screen.getByTestId("tag-selection")).toBeInTheDocument();


    })

    test("loads tag elements", async () => {
        await act(async () => render(<Router history={history}><Home/></Router>));

        await act(async () => fireEvent.click(screen.getByText("Elige las tags")));

        expect(screen.getByTestId("tag-selection")).toBeInTheDocument();

        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
        expect(screen.getByText("c")).toBeInTheDocument();


    })

    test("creates the game correctly", async () => {



        await act(async () => render(<Router history={history}><Home/></Router>));


        await act(async () => fireEvent.click(screen.getByText("JUGAR")));


        expect(navigate).toHaveBeenCalledWith("/game", {
            state: {
                tags: "a,b,c"
            }
        });



    }
)
});
