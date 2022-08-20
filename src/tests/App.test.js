import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRouter, renderWithRouter, renderWithContext } from '../helpers/renderWithRouterContext';
import Footer from '../components/Footer';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../images/mealIcon.svg';

describe('Componente Footer', () => {
    test('Deve renderizar  a página Drinks', () => {
        const { history } = renderWith(<App />);
        expect(history.location.pathname).toBe('/drinks');
    });

    test('Deve renderizar  a página Foods', () => {
        const { history } = renderWith(<App />);
        expect(history.location.pathname).toBe('/foods');
    });

    test('Deve renderizar  os data-testids no App', () => {
        renderWithRouter(<App />);
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
        
    });

    test('Deve renderizar os data-testids no Footer', () => {
        const { history } = renderWithRouter(<Footer />, '/foods');
        expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
        expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();

        userEvent.click(screen.getByTestId('drinks-bottom-btn'));
        const path = history.location.pathname;
        userEvent.click(screen.getByTestId('food-bottom-btn'));
        expect(path).toBe('/drinks');
    
    });

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
});