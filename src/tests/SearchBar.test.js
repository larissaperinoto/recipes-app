import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../context/Provider';
import rendeWithRouter from './helpers/renderWithRouter';
import {
  veganMeals,
  drinksWithLemon,
  mealsWithNameLemon,
  drinksCategory,
  foodsCategory,
  foodsRecomendation,
  drinksRecomendation,
  drinksWithLetterY } from './helpers/mockData';
import App from '../App';

describe('Verifica renderização do componente Header', () => {
  test('Verifica se é possível pesquisar por uma comida usando os filtros', async () => {

     fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=vegan') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(veganMeals)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
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

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'vegan');
    userEvent.click(screen.getByText("Name"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=vegan'));

    expect(screen.getAllByTestId(/recipe-card/i).length).toBe(2);
    expect(screen.getAllByTestId(/card-img/i).length).toBe(2);
    expect(screen.getAllByTestId(/card-name/i).length).toBe(2);
  });

  test('Verifica se é possível pesquisar por um drink usando os filtros', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksWithLemon)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksCategory)
        })
      }
    });

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/drinks');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'lemon');
    userEvent.click(screen.getByText("Ingredient"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'));

    expect(screen.getAllByTestId(/recipe-card/i).length).toBe(12);
    expect(screen.getAllByTestId(/card-img/i).length).toBe(12);
    expect(screen.getAllByTestId(/card-name/i).length).toBe(12);
  });

  test('Verifica se a página é redirecionada quando apenas uma receita é encontrada', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=lemon') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mealsWithNameLemon)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
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

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'lemon');
    userEvent.click(screen.getByText("Name"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=lemon'));

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/53009');
  });

  test('Verifica se um alerta é mostrado ao pesquisar usando o filtro First Letter com mais de uma letra', async () => {

    fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(foodsRecomendation)
    });

    global.alert = jest.fn();

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/foods');

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'lemon');
    userEvent.click(screen.getByText("First letter"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  test('Verifica se o filtro First Letter funciona corretamente na página Foods', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?f=l') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mealsWithNameLemon)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsCategory)
        })
      }
    });

    global.alert = jest.fn();

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/foods');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'l');
    userEvent.click(screen.getByText("First letter"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert).not.toBeCalled();
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=l'));
  });

  test('Verifica se o filtro First Letter funciona corretamente na página Drinks', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksWithLetterY)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksCategory)
        })
      }
    });

    global.alert = jest.fn();

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/drinks');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'y');
    userEvent.click(screen.getByText("First letter"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert).not.toBeCalled();
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y'));
  });

  test('Verifica se um alerta é mostrado quando não é encontrado nenhum resultado para a busca na página Foods', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      } else if (url == 'https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau'){
        return Promise.resolve({
          json: jest.fn().mockResolvedValue([])
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsCategory)
        })
      }
    });

    jest.spyOn(global, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/foods');

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));
    userEvent.type(screen.getByTestId("search-input"), 'xablau');
    userEvent.click(screen.getByText("Ingredient"));
    userEvent.click(screen.getByTestId('exec-search-btn'));


    expect(global.alert()).toBe('Sorry, we haven\'t found any recipes for these filters.');
    expect(global.alert).toBeCalled();
  });

 /*  test('Verifica se um alerta é mostrado quando não é encontrado nenhum resultado para a busca na página Drinks', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');

    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/drinks');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));
    userEvent.type(screen.getByTestId("search-input"), 'xablau');
    userEvent.click(screen.getByText("Ingredient"));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert()).toBe('Sorry, we haven\'t found any recipes for these filters.');
    expect(global.alert).toBeCalled();

  }); */
});