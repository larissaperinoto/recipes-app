import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../context/Provider';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import {
    mockFoodWithId,
    drinksRecomendation,
    mockDrinkWithId,
    foodsRecomendation } from './helpers/mockData';

describe('Verifica renderização  da página de detalhes', () => {
  test('Verifica se os detalhes renderizados para uma receita de food', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockFoodWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      }
    })

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/foods/52771');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'));
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Vegetarian');
    expect(screen.getAllByTestId(/ingredient-name-and-measure/i).length).toBe(8);
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getAllByTestId(/recomendation-card/i).length).toBe(6);

    const favoriteButton = screen.getByTestId('favorite-btn');

    expect(screen.getByRole('button', { name: /shareicon/i })).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.alt.includes('whiteHeartIcon')).toBeTruthy();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();

    /* userEvent.click(screen.getByRole('button', { name: /shareicon/i }));
    expect(screen.getByText("Link copied!")).toBeInTheDocument(); */

    userEvent.click(favoriteButton);
    expect(favoriteButton.alt.includes('blackHeartIcon')).toBeTruthy();

    userEvent.click(screen.getByTestId('start-recipe-btn'));

   /*  const pathname = history.location;

    expect(pathname).not.tobe('/foods/52771'); */
  });

  test('Verifica se os detalhes são renderizados para uma receita de drink', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockDrinkWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      }
    })

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/drinks/178319');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getAllByTestId(/ingredient-name-and-measure/i).length).toBe(3);
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
    expect(screen.getAllByTestId(/recomendation-card/i).length).toBe(6);

    const favoriteButton = screen.getByTestId('favorite-btn');

    expect(screen.getByRole('button', { name: /shareicon/i })).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.alt.includes('whiteHeartIcon')).toBeTruthy();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();

    /* userEvent.click(screen.getByRole('button', { name: /shareicon/i }));
    expect(screen.getByText("Link copied!")).toBeInTheDocument(); */

    userEvent.click(favoriteButton);
    expect(favoriteButton.alt.includes('blackHeartIcon')).toBeTruthy();

    userEvent.click(screen.getByTestId('start-recipe-btn'));

  });
});
