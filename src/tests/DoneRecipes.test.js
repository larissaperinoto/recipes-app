import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../context/Provider';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Verifica a renderização da tela de receitas cocluídas', () => {
   test('Verifica se o ícone Profile redireciona para a rota /profile', () => {
     const { history } = renderWithRouter(<Provider><App /></Provider>);

     history.push('/done-recipes');

     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
     userEvent.click(screen.getByRole("img", { name: /profileicon/i }));

     const pathname = history.location.pathname;

     expect(pathname).toBe('/profile');
   });

   test('Verifica se o título da página é renderizado e os botões de filtro', () => {
     const { history } = renderWithRouter(<Provider><App /></Provider>);

     history.push('/done-recipes');

     expect(screen.getByRole("heading", { name: /done recipes/i })).toBeInTheDocument();

     expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
     expect(screen.getByRole("button", { name: /food/i })).toBeInTheDocument();
     expect(screen.getByRole("button", { name: /drinks/i })).toBeInTheDocument();
   });

   test('Verifica se os cards de receitas feitas são renderizados', () => {
     localStorage.setItem('doneRecipes', JSON.stringify([{
       id: '52771',
       type: 'food',
       nationality: 'Italian',
       category: 'Vegetarian',
       alcoholicOrNot: '',
       name: 'Spicy Arrabiata Penne',
       image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
       doneDate: '23/06/2020',
       tags: ['Pasta', 'Curry'],
     },
     {
       id: '178319',
       type: 'drink',
       nationality: '',
       category: 'Cocktail',
       alcoholicOrNot:  'Alcoholic',
       name: 'Aquamarine',
       image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
       doneDate: '23/06/2020',
       tags: [],
     }]));

     const { history } = renderWithRouter(<Provider><App /></Provider>);

     history.push('/done-recipes');

     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-done-date/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-tag/i).length).toBe(2);
   });
});
