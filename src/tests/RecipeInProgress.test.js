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
import { beforeEach } from 'mocha';

describe('Verifica renderização  da página de In progress', () => {
  test('Verifica se os detalhes renderizados para uma receita de food', async () => {

  const store = { id: '52771', arr: [0] };
  localStorage.setItem('historyRiscar', JSON.stringify(store));
  const pega = JSON.parse(localStorage.getItem('historyRiscar')); 
  expect(typeof pega).toBe('object');

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

  history.push('/foods/52771/in-progress');

  await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'));
  await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

  expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
  expect(screen.getByTestId('recipe-category').innerHTML).toBe('Vegetarian');
  expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
  expect(screen.getByTestId('instructions')).toBeInTheDocument();
  expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
  expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('1-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('2-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('3-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('4-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('5-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('6-ingredient-step')).toBeInTheDocument();
  expect(screen.getByTestId('7-ingredient-step')).toBeInTheDocument();
  });

  test('Verifica se os detalhes renderizados para uma receita de drink', async () => {

    const store = { id: '178319', arr: [0] };
    localStorage.setItem('historyRiscar', JSON.stringify(store));
    const pega = JSON.parse(localStorage.getItem('historyRiscar')); 
    console.log(typeof pega);


    expect(typeof pega).toBe('object');

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

    history.push('/drinks/178319/in-progress');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Cocktail');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
    expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument();
    expect(screen.getByTestId('1-ingredient-step')).toBeInTheDocument();
    expect(screen.getByTestId('2-ingredient-step')).toBeInTheDocument();
    });
});
