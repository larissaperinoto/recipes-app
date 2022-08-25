import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

import Provider from '../context/Provider';

describe('Componente Footer', () => {
  test('Deve renderizar os data-testids no Footer', () => {
    const { history } = renderWithRouter(<Provider><Footer /></Provider>, '/foods');
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    const path = history.location.pathname;
    userEvent.click(screen.getByTestId('food-bottom-btn'));
    expect(path).toBe('/drinks');
  });
});