import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import Provider from '../context/Provider';
import Profile from '../pages/Profile';

describe('Profile page', () => {
  test('Deve renderizar o e-mail e todos os três botões: Done Recipes, Favorite Recipes, Logout', () => {
    const sendUser = {
      email: 'teste@testes.com',
    };

    localStorage.setItem('user', JSON.stringify(sendUser));

    renderWithRouter(<Provider><Profile /></Provider>);

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  test('Verifica se após o clicar em "Logout", o usuário é redirecionado para "Login"', () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  })
});