import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../context/Provider';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Verifica renderização do componente Header', () => {
  test('Verifica se ícones e título renderizados corretamente na rota /foods', () => {
  const { history } = rendeWithRouter(<Provider><App /></Provider>);

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
    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/drinks');

     expect(screen.getByRole("heading", { name: /drinks/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /done-recipes', () => {
    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/done-recipes');

     expect(screen.getByRole("heading", { name: /done recipes/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
  });

  test('Verifica se o botão de Profile redireciona para a rota "/profile"', () => {
    const { history } = rendeWithRouter(<Provider><App /></Provider>);

    history.push('/done-recipes');

    userEvent.click(screen.getByTestId(/profile-top-btn/i));

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});
