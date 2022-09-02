import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  const history = useHistory();

  function handleSendDrinks() {
    history.push('/drinks');
  }

  function handleSendFoods() {
    history.push('/foods');
  }

  return (
    <footer className="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ handleSendDrinks }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        onClick={ handleSendFoods }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </footer>
  );
}
