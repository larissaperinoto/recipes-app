import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';

import App from '../App';
import HeaderProvider from '../context/HeaderProvider';
import Provider from '../context/Provider';

test('App', () => {
  renderWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

  expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });
