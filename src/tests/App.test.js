import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouterContext';

describe('Componente App', () => {
    test('Deve testar o App', () => {
        renderWithRouter(<App />);
    });
});
