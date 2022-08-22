import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeaderProvider from '../context/HeaderProvider';
import rendeWithRouter from './helpers/renderWithRouter';
import { veganMeals, drinksWithLemon } from './helpers/mockData';
import App from '../App';

describe('Verifica renderização do componente Header', () => {
  test('Verifica se ícones e título renderizados corretamente na rota /foods', () => {
  const { history } = rendeWithRouter(<HeaderProvider><App /></HeaderProvider>);

  history.push('/foods');

   expect(screen.getByRole("heading", { name: /foods/i })).toBeInTheDocument();
   expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
   expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();

   userEvent.click(screen.getByRole("img", { name: /searchicon/i }));
   expect(screen.getByRole("textbox")).toBeInTheDocument();
   expect(screen.getByRole("radio", { name: /ingredient/i })).toBeInTheDocument();
   expect(screen.getByRole("radio", { name: /name/i })).toBeInTheDocument();
   expect(screen.getByRole("radio", { name: /first letter/i })).toBeInTheDocument();
   expect(screen.getByRole("button", { name: /seleção/i })).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /drinks', () => {
    const { history } = rendeWithRouter(<HeaderProvider><App /></HeaderProvider>);

    history.push('/drinks');

     expect(screen.getByRole("heading", { name: /drinks/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /done-recipes', () => {
    const { history } = rendeWithRouter(<HeaderProvider><App /></HeaderProvider>);
    history.push('/done-recipes');

     expect(screen.getByRole("heading", { name: /done recipes/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();

     userEvent.click(screen.getByRole("img", { name: /profileicon/i }));

     const { location: { pathname }} = history;
     expect(pathname).toBe('/profile');
  });

  test('Verifica se é possível pesquisar por uma comida usando os filtros', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(veganMeals)
    })

    const { history } = rendeWithRouter(<HeaderProvider><App /></HeaderProvider>);

    history.push('/foods');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'vegan');
    userEvent.click(screen.getByText("Name"));

    userEvent.click(screen.getByRole("button", { name: /seleção/i }));

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=vegan'));
  });

  test('Verifica se é possível pesquisar por um drink usando os filtros', async () => {

    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksWithLemon)
    })

    const { history } = rendeWithRouter(<HeaderProvider><App /></HeaderProvider>);

    history.push('/drinks');

    userEvent.click(screen.getByRole("img", { name: /searchicon/i }));

    userEvent.type(screen.getByTestId("search-input"), 'lemon');
    userEvent.click(screen.getByText("Ingredient"));

    userEvent.click(screen.getByRole("button", { name: /seleção/i }));

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'));
  });
});
