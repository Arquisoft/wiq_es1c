import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, BrowserRouter as Router  } from 'react-router-dom';
import { Footer } from './Footer';
import '../../i18n';

describe("Footer component", () => {
    beforeEach(() => localStorage.setItem("token", "manolineldelpino"));

    test("renders component",async () => {
        render(<MemoryRouter><Footer/></MemoryRouter>);
        
        await act(async () => {});

        expect(screen.getByText(/All rights reserved./i)).toBeInTheDocument();
        

    });
});