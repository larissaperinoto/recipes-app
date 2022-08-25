import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeaderProvider from '../context/HeaderProvider';
import Provider from '../context/Provider';
import rendeWithRouter from './helpers/renderWithRouter';
import { veganMeals, drinksWithLemon, mealsWithNameLemon, drinksCategory, foodsCategory } from './helpers/mockData';
import App from '../App';

describe('Verifica renderização do componente Header', () => {
  test('Verifica se ícones e título renderizados corretamente na rota /foods', () => {
  const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

  history.push('/foods');

   expect(screen.getByRole("heading", { name: /foods/i })).toBeInTheDocument();
   expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
   expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();

   userEvent.click(screen.getByRole("img", { name: /searchicon/i }));
   expect(screen.getByRole("textbox")).toBeInTheDocument();
   expect(screen.getByRole("radio", { name: /ingredient/i })).toBeInTheDocument();
   expect(screen.getByRole("radio", { name: /name/i })).toBeInTheDocument();
   expect(screen.getByRole("radio", { name: /first letter/i })).toBeInTheDocument();
   expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /drinks', () => {
    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/drinks');

     expect(screen.getByRole("heading", { name: /drinks/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /done-recipes', () => {
    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/done-recipes');

     expect(screen.getByRole("heading", { name: /done recipes/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
  });

  test('Verifica se o botão de Profile redireciona para a rota "/profile"', () => {
    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/done-recipes');

    userEvent.click(screen.getByTestId(/profile-top-btn/i));

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  test('Verifica se é possível pesquisar por uma comida usando os filtros', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(veganMeals)
    })

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

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

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksWithLemon)
    })

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

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

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsWithNameLemon)
    })

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/foods');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'lemon');
    userEvent.click(screen.getByText("Name"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=lemon'));

    const primeiroLista = screen.getByTestId('0-recipe-card');
    userEvent.click(primeiroLista);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/53009');
  });

  test('Verifica se um alerta é mostrado ao pesquisar usando o filtro First Letter com mais de uma letra', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsWithNameLemon)
    })

    global.alert = jest.fn();

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/foods');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'lemon');
    userEvent.click(screen.getByText("First letter"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  test('Verifica se o filtro First Letter funciona corretamente na página Foods', async () => {
    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsWithNameLemon)
    })

    global.alert = jest.fn();

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/foods');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'l');
    userEvent.click(screen.getByText("First letter"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert).not.toBeCalled();
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=l'));
  });

  test('Verifica se o filtro First Letter funciona corretamente na página Drinks', async () => {
    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsWithNameLemon)
    })

    global.alert = jest.fn();

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/drinks');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'd');
    userEvent.click(screen.getByText("First letter"));

    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert).not.toBeCalled();
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d'));
  });

  test('Verifica se um alerta é mostrado quando não é encontrado nenhum resultado para a busca na página Foods', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsWithNameLemon)
    })

    jest.spyOn(global, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/foods');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));
    userEvent.type(screen.getByTestId("search-input"), 'sdsadadfdsf');
    userEvent.click(screen.getByText("Ingredient"));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(fetch).toBeCalled());

    expect(global.alert()).toBe('Sorry, we haven\'t found any recipes for these filters.');
    expect(global.alert).toBeCalled();
  });

  test('Verifica se um alerta é mostrado quando não é encontrado nenhum resultado para a busca na página Drinks', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsWithNameLemon)
    })

    jest.spyOn(global, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');

    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>);

    history.push('/drinks');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));
    userEvent.type(screen.getByTestId("search-input"), 'xablau');
    userEvent.click(screen.getByText("Ingredient"));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.alert()).toBe('Sorry, we haven\'t found any recipes for these filters.');
    expect(global.alert).toBeCalled();

  });

  test('Deve renderizar os data-testids no Recipes', async () => {
    const { history } = rendeWithRouter(<Provider><HeaderProvider><App /></HeaderProvider></Provider>, '/foods');

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodsCategory)
    })

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksCategory)
    })

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));

    const path = history.location.pathname;

    expect(path).toBe('/foods');
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();



    expect(path).toBe('/drinks');

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();

    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('3-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('4-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('5-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('6-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('7-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('8-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('9-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('10-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();

    // userEvent.click(screen.getByTestId(''));

    });

});
