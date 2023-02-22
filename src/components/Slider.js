import React, { useContext } from 'react';
import '../styles/Slider.css';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { Container } from '@mui/material';

export default function Slider() {
  const { recipeDetails: { recomendations } } = useContext(Context);

  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.split('/')[1];

  return (
    <Container>
      <ul className="slides-container">
        { recomendations.map((recommendation, index) => (
          <li
            className="slide"
            key={ index }
          >
            <h3>
              { type === 'foods' ? recommendation.strDrink : recommendation.strMeal }
            </h3>
            <img
              src={ type === 'foods'
                ? recommendation.strDrinkThumb
                : recommendation.strMealThumb }
              width="100%"
              alt=""
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}
