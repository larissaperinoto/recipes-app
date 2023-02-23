import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/Slider.css';

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
