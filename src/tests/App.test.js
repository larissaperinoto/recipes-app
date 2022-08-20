import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRouter, renderWithRouter, renderWithContext } from '../helpers/renderWithRouterContext';
import Footer from '../components/Footer';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

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
        expect(path).toBe('/drinks')
        userEvent.click(screen.getByTestId('food-bottom-btn'));
        expect(withRouter(<Footer />, '/foods')).toBe('/foods');

        expect(screen.getByRole('src', drinkIcon)).toBeInTheDocument();

        
        
    });
});