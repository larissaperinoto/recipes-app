import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../css/Footer.css';
import '../css/RecipesInProgress.css';
import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';

function RecipeInProgress() {
  const history = useHistory();
  const [riscar, setRiscar] = useState([]);
  const { recipeDetails, setRecipeDetails } = useContext(Context);
  const { details: { strMeal,
    strMealThumb, strTags, strInstructions }, ingredients } = recipeDetails;
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  const getIngredients = (data) => {
    const max = 30;
    const ingredient = [];
    for (let index = 1; index <= max; index += 1) {
      if (data[`strIngredient${index}`]) {
        const string = `${data[`strMeasure${index}`]} ${data[`strIngredient${index}`]}`;
        ingredient.push(string);
      }
    }
    return ingredient;
  };

  useEffect(() => {
    const requestData = async () => {
      const data = type === 'foods'
        ? await requestMealWithId(id) : await requestDrinkWithId(id);
      const recomendationList = type === 'foods'
        ? await requestDrinksRecomendation() : await requestFoodsRecomendation();
      const ingredientsList = getIngredients(data[0]);
      setRecipeDetails({
        details: data[0],
        ingredients: ingredientsList,
        recomendations: recomendationList,
      });
    };
    requestData();
  }, [id, type]);

  const handleRiscar = (index) => {
    setRiscar([...riscar.filter((risco) => risco !== index && risco !== ''),
      riscar.includes(index) ? '' : index]);
    localStorage.setItem('historyRiscar', JSON.stringify([...riscar
      .filter((risco) => risco !== index && risco !== ''),
    riscar.includes(index) ? '' : index]));
  };

  const handleSendDone = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <div>
        <div><img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } /></div>
        <div>
          <span data-testid="recipe-title">{strMeal}</span>
          <span>
            <button data-testid="share-btn" type="button">
              Compartilhar
            </button>
          </span>
          <span>
            <button data-testid="favorite-btn" type="button">
              Favoritar
            </button>
          </span>
        </div>
        <div data-testid="recipe-category">{strTags}</div>
      </div>
      <div>
        <div>Ingredientes:</div>
        <div>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                { riscar.length > 0
                  ? (
                    <input
                      type="checkbox"
                      name="ingredient"
                      value={ index }
                      onChange={ () => handleRiscar(index) }
                    />
                  )
                  : (
                    <input
                      type="checkbox"
                      name="ingredient"
                      value={ index }
                      onChange={ () => handleRiscar(index) }
                    />
                  )}
                {riscar.includes(index)
                  ? <span className="riscado">{ingredient }</span>
                  : <span>{ingredient}</span>}

              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div>Instruções:</div>
        <div data-testid="instructions">{strInstructions}</div>
      </div>
      <div>
        <button
          data-testid="finish-recipe-btn"
          className="btn-finish-recipes"
          type="button"
          disabled
          onClick={ handleSendDone }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
