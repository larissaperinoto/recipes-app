import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouterContext';

describe('Componente Login', () => {
  test('Deve renderizar os data-testids do Login', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  test('Deve verificar se o botão está habilidado quando o campo email e senha estão corretos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const senhaInput = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(senhaInput, '1234567');

    expect(loginSubmitBtn.disabled).toBe(false);
  });

  test('Testa se o botão "Enter" direciona para a rota /foods', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId("email-input");
    const senhaInput = screen.getByTestId("password-input");
    const loginSubmitBtn = screen.getByTestId("login-submit-btn");

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(senhaInput, 'password');
    // expect(loginSubmitBtn).toHaveProperty('disabled', false);
    userEvent.click(loginSubmitBtn);

    // const { pathname } = history.location;
    // expect(pathname).toBe('/foods')

    const foodsHeading = screen.getByRole('heading', { level: 1 });
    expect(foodsHeading).toBeInTheDocument();
  })
});