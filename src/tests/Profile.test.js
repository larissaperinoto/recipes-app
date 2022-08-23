import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouterContext';

import HeaderProvider from '../context/HeaderProvider';
import Provider from '../context/Provider';
import Profile from '../pages/Profile';

describe('Profile page', () => {
  test('Deve renderizar o e-mail e todos os três botões: Done Recipes, Favorite Recipes, Logout', () => {
    const sendUser = {
      email: 'teste@testes.com',
    };

    localStorage.setItem('user', JSON.stringify(sendUser));

    renderWithRouter(<Provider><HeaderProvider><Profile /></HeaderProvider></Provider>);
    
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  test('Verifica se após o clicar em "Logout", o usuário é redirecionado para "Login"', () => {
    const { history } = renderWithRouter(<Provider><HeaderProvider><Profile /></HeaderProvider></Provider>);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  })
});