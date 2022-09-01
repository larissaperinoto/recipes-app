import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import Provider from '../context/Provider';
import rendeWithRouter from './helpers/renderWithRouter';
import { requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';
import {
  drinksCategory,
  drinksRecomendation,
  foodsRecomendation,
  foodsCategory,
  foodByGoatCategory,
  drinkByShakeCategory,
  corbaRecipe,
  ggDrinkRecipe } from './helpers/mockData';
import App from '../App';
import userEvent from '@testing-library/user-event';

/*   jest.mock('services/requestMealsAndDrinksAPI', () => ({
    requestFoodsRecomendation: jest.fn(() => foodsRecomendation)
  })); */

describe('Verifica a renderixação do componente Recipe', () => {
  test('Deve renderizar os data-testids no Recipes na rota /foods', async () => {
    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodByGoatCategory)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(corbaRecipe)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsCategory)
        })
      }
    });

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/foods');

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('Goat-category-filter'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat'));
    expect(screen.getAllByTestId(/card-img/i).length).toBe(1);

    userEvent.click(screen.getByTestId('All-category-filter'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    expect(screen.getAllByTestId(/card-img/i).length).toBe(12);

    userEvent.click(screen.getByRole("img", { name: /corba/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'));

    const pathname = history.location.pathname;
    expect(pathname).toBe('/foods/52977');
  });

  test('Deve renderizar os data-testids no Recipes na rota /drinks', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinkByShakeCategory)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksCategory)
        })
      }
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({'id':'15997','arr':[1,0]}));

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/drinks');

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();

    expect(screen.getAllByTestId(/recipe-card/i).length).toBe(12);

    userEvent.click(screen.getByTestId('Shake-category-filter'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake'));

    expect(screen.getAllByTestId(/recipe-card/i).length).toBe(12);
    expect(screen.getByTestId('0-card-img').src).toBe('https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg');

    userEvent.click(screen.getByTestId('All-category-filter'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    userEvent.click(screen.getByRole("img", { name: /gg/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997'));

    const pathname = history.location.pathname;
    expect(pathname).toBe('/drinks/15997');

    expect(screen.getByRole("button", { name: /continue recipe/i })).toBeInTheDocument();
  });
});