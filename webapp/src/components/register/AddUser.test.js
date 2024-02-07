// src/components/AddUser.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AddUser from './AddUser';

jest.mock('../../services/user.service', () => ({
  register: jest.fn(() => Promise.resolve('')), // Resolve with an empty string to simulate success
}));

describe('AddUser Component', () => {
  test('renders AddUser component', () => {
    render(<MemoryRouter><AddUser /></MemoryRouter>);
    expect(screen.getByText('Registro')).toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    /* TODO fix these tests
    render(<MemoryRouter><AddUser /></MemoryRouter>);
    
    fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'validPassword' } });
    fireEvent.change(screen.getByLabelText(/Repetir contraseña/i), { target: { value: 'validPassword' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Registrarme' }));

    // Wait for the asynchronous code inside doRegister to complete
    await waitFor(() => {
      expect(screen.queryByText('')).not.toBeInTheDocument(); // No error message should be present
    });*/
  });

  test('displays error message with invalid input', async () => {
    /* TODO fix these tests
    render(<MemoryRouter><AddUser /></MemoryRouter>);

    fireEvent.submit(screen.getByRole('button', { name: 'Registrarme' }));

    await waitFor(() => {
      expect(screen.getByText('')).toBeInTheDocument(); // An error message should be present
    });*/
  });

  // Add more tests as needed
});
