// Obs: Para os testes passarem é necessário que o componente seja chamado de Footer.js
// Este requisito também inclui testes de cobertura do componente Footer.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  const history = useHistory();

  function hendleSendDrinks() {
    history.push('/drinks');
  }

  function hendleSendFoods() {
    history.push('/foods');
  }

  return (
    <footer className="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ hendleSendDrinks }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        onClick={ hendleSendFoods }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </footer>
  );
}
