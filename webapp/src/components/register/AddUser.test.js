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

  test('submit the form with valid inputs', async () => {
    render(<MemoryRouter><AddUser /></MemoryRouter>);
    
    fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'validUsername' } });

    fireEvent.change(screen.getAllByLabelText(/Contraseña/i)[0], { target: { value: 'validPassword' } });
    fireEvent.change(screen.getByLabelText(/Repetir contraseña/i), { target: { value: 'validPassword' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Registrarme' }));

    // Wait for the asynchronous code inside doRegister to complete
    await waitFor(() => {
      expect(screen.queryByText('Debes introducir tu nombre de usuario')).toBeNull();
      expect(screen.queryByText('Debes introducir una contraseña')).toBeNull();
    });
  });

  test('attempt to register with empty fields', async () => {
    render(<MemoryRouter><AddUser /></MemoryRouter>);

    fireEvent.submit(screen.getByRole('button', { name: 'Registrarme' }));

    await waitFor(() => {
      expect(screen.getByText('Debes introducir tu nombre de usuario')).toBeInTheDocument();
      expect(screen.getByText('Debes introducir una contraseña')).toBeInTheDocument();
    });
  });

  test('submit the form with different passwords', async () => {
    render(<MemoryRouter><AddUser /></MemoryRouter>);
    
    fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'validUsername' } });

    fireEvent.change(screen.getAllByLabelText(/Contraseña/i)[0], { target: { value: 'validPassword' } });
    fireEvent.change(screen.getByLabelText(/Repetir contraseña/i), { target: { value: 'invalidPassword' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Registrarme' }));

    // Wait for the asynchronous code inside doRegister to complete
    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
  });
});
