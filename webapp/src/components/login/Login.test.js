// src/components/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

jest.mock('../../services/user.service', () => ({
  login: jest.fn(() => Promise.resolve(true)),
}));

describe('Login Component', () => {
  test('renders Login component', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'validPassword' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar sesión' }));

    // Wait for the asynchronous code inside handleSubmit to complete
    await waitFor(() => {
      expect(screen.queryByText('Usuario o contraseña incorrectos')).not.toBeInTheDocument();
    });
  });

  test('displays error message with invalid input', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => {
      expect(screen.getByText('Debes introducir tu nombre de usuario')).toBeInTheDocument();
      expect(screen.getByText('Debes introducir tu contraseña')).toBeInTheDocument();
      expect(screen.queryByText('Usuario o contraseña incorrectos')).not.toBeInTheDocument();
    });
  });
});
