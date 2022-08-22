import React from 'react';
import Profile from '../pages/Profile';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouterContext';

describe('Profile page', () => {
  test('Deve renderizar o e-mail e todos os três botões: Done Recipes, Favorite Recipes, Logout', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });
});