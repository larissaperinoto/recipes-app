import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../context/Provider';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Verifica a renderização da tela de receitas favoritas', () => {
  // test('Verifica se o ícone Profile redireciona para a rota /profile', () => {
  //   const { history } = renderWithRouter(<Provider><App /></Provider>);

  //   history.push('/favorite-recipes');

  //   expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
  //   userEvent.click(screen.getByRole("img", { name: /profileicon/i }));

  //   const pathname = history.location.pathname;

  //   expect(pathname).toBe('/profile');
  // });

  // test('Verifica se o título da página é renderizado e os botões de filtro', () => {
  //   const { history } = renderWithRouter(<Provider><App /></Provider>);

  //   history.push('/favorite-recipes');

  //   expect(screen.getByRole("heading", { name: /Favorite Recipes/i })).toBeInTheDocument();

  //   expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
  //   expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
  //   expect(screen.getAllByTestId('filter-by-drink-btn')).toBeInTheDocument();
  // });

  // test('Verifica se os cards de receitas favoritas são renderizados', () => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([{
  //     id: '52771',
  //     type: 'food',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot:  'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   }]));

  //   const { history } = renderWithRouter(<Provider><App /></Provider>);

  //   history.push('/favorite-recipes');

  //   expect(screen.getAllByTestId(/horizontal-image/i)).toBe(2);
  //   expect(screen.getAllByTestId(/horizontal-top-text/i)).toBe(2);
  //   expect(screen.getAllByTestId(/horizontal-name/i)).toBe(2);
  //   expect(screen.getAllByTestId(/horizontal-share-btn/i)).toBe(2);
  // });
});
