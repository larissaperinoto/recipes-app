import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import Provider from '../context/Provider';
import rendeWithRouter from './helpers/renderWithRouter';
import {
  drinksCategory,
  drinksRecomendation,
  foodsRecomendation,
  foodsCategory } from './helpers/mockData';
import App from '../App';


describe('Verifica a renderixação do componente Recipe', () => {
  test('Deve renderizar os data-testids no Recipes na rota /foods', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsCategory)
        })
      }
    });

    const { history } = rendeWithRouter(<Provider><App /></Provider>, '/foods');

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
  });

  test('Deve renderizar os data-testids no Recipes na rota /drinks', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksCategory)
        })
      }
    });

    const { history } = rendeWithRouter(<Provider><App /></Provider>, '/foods');

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

    expect(screen.getAllByTestId(/recipe-card/i).length).toBe(11);
  });
});