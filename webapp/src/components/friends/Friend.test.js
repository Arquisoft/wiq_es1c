import React from 'react';
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Friends } from './Friend';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('../../services/friends.service', () => ({
    getFriends: () => Promise.resolve([{friend1: "1", friend2: "2"}]),
    getRequests: () => Promise.resolve([])
}));

jest.mock('../../services/user.service', () => ({
    getCurrentUser: () => Promise.resolve("Paco"),
    getUsers: () => Promise.resolve([{name: "Paco",id:"1"}, {name: "Juan",id:"2"}])
}));

describe('Game Component', () => {
    
  test("renders component",async () => {
    await act(async () => render(
      <MemoryRouter>
          <Friends/>
      </MemoryRouter>)
    );

    expect(screen.getByText(/Amigos/i)).toBeInTheDocument();
    expect(screen.getByText(/Juan/i)).toBeInTheDocument();
  });
})