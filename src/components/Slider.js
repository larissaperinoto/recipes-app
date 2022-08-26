import React, { useContext } from 'react';
import './styles/Slider.css';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function Slider() {
  const {
    recipeDetails: { recomendations },
  } = useContext(Context);

  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.split('/')[1];

  return (
    <section>
      <ul className="slides-container">
        { recomendations.map((recommendation, index) => (
          <li
            className="slide"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <h3 data-testid={ `${index}-recomendation-title` }>
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
    </section>
  );
}
