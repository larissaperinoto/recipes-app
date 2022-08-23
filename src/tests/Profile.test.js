import React from 'react';
import Profile from '../pages/Profile';
import App from '../App';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouterContext';

describe('Profile page', () => {
  test('Deve renderizar o e-mail e todos os três botões: Done Recipes, Favorite Recipes, Logout', () => {
    const sendUser = {
      email: 'teste@testes.com',
    };

    localStorage.setItem('user', JSON.stringify(sendUser));

    render(<Profile />);

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  test('Verifica se após o clicar em "Logout", o usuário é redirecionado para "Login"', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  })
});