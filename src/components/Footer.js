import { IconButton } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <footer>
      <IconButton
        type="button"
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
        title="Drinks"
      >
        <img src={ drinkIcon } alt="Drinks Page" />
      </IconButton>
      <IconButton
        type="button"
        onClick={ () => history.push('/foods') }
        src={ mealIcon }
        title="Meals"
      >
        <img src={ mealIcon } alt="Meals Page" />
      </IconButton>
    </footer>
  );
}
