import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../context/Provider';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Verifica a renderização da tela de receitas cocluídas', () => {

  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    }
  })

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

    userEvent.click(screen.getAllByTestId(/horizontal-image/i)[0]);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/foods/52771');
  });

  test('Verifica se o food, drinks e all funcionam corretamente e o botão compartilhar', () => {

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

  userEvent.click(screen.getByRole("button", { name: /food/i }));

  expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
  expect(screen.getAllByTestId(/horizontal-image/i)[0].src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
  expect(screen.getAllByTestId(/horizontal-top-text/i)[0].innerHTML).toBe('Italian - Vegetarian');
  expect(screen.getByTestId('0-Pasta-horizontal-tag').innerHTML).toBe('Pasta');
  expect(screen.getByTestId('0-Curry-horizontal-tag').innerHTML).toBe('Curry');

  userEvent.click(screen.getByRole("button", { name: /drinks/i }));

  expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
  expect(screen.getAllByTestId(/horizontal-image/i)[0].src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
  expect(screen.getAllByTestId(/horizontal-top-text/i)[0].innerHTML).toBe('Alcoholic');

  userEvent.click(screen.getByRole("button", { name: /all/i }));

  expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
  expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);

  userEvent.click(screen.getAllByTestId(/horizontal-share-btn/i)[0]);
  expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
  });
});
