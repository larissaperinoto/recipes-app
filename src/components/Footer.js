// Obs: Para os testes passarem é necessário que o componente seja chamado de Footer.js
// Este requisito também inclui testes de cobertura do componente Footer.js
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <button data-testid="drinks-bottom-btn" type="button">
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button data-testid="food-bottom-btn" type="button">
        <img src={ mealIcon } alt="drinkIcon" />
      </button>
    </footer>
  );
}
