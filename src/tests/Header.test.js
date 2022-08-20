import React from 'react';
import { render, screen } from '@testing-library/react';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Verifica renderização do componente Header', () => {
  test('Verifica se ícones e título renderizados corretamente na rota /foods', () => {
  const { history } = rendeWithRouter(<App />);

  history.push('/foods');

   expect(screen.getByRole("heading", { name: /foods/i })).toBeInTheDocument();
   expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
   expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /drinks', () => {
    const { history } = rendeWithRouter(<App />);

    history.push('/drinks');

     expect(screen.getByRole("heading", { name: /drinks/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /searchicon/i })).toBeInTheDocument();
  });

  test('Verifica se ícones e título renderizados corretamente na rota /done-recipes', () => {
    const { history } = rendeWithRouter(<App />);
    history.push('/done-recipes');
    const { location: { pathname }} = history;
    expect(pathname).toBe('/done-recipes');

     expect(screen.getByRole("heading", { name: /done recipes/i })).toBeInTheDocument();
     expect(screen.getByRole("img", { name: /profileicon/i })).toBeInTheDocument();
  });
});
