import React, { useContext, useEffect } from 'react';
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
  const {
    recipeDetails,
    setRecipeDetails,
    doneRecipes,
    setDoneRecipes,
    historyDoneRecipes,
    sethistoryDoneRecipes,
  } = useContext(Context);
  const { details: { strMeal,
    strDrinkThumb,
    strDrink,
    strMealThumb, strCategory, strInstructions }, ingredients } = recipeDetails;
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
    if (doneRecipes.arr.some((rec) => rec === index)) {
      setDoneRecipes({ id,
        arr: [...doneRecipes.arr.filter((risco) => risco !== index)] });
    } else {
      setDoneRecipes({ id, arr: [...doneRecipes.arr, index] });
    }
  };

  useEffect(() => {
    if (doneRecipes.id.length !== 0) {
      localStorage.setItem('historyRiscar', JSON.stringify(doneRecipes));
    }
  }, [doneRecipes]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('historyRiscar'));
    if (data === null) {
      sethistoryDoneRecipes({ id: '', arr: [] });
    } else {
      sethistoryDoneRecipes(data);
    }
  }, []);

  const handleSendDone = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <div>
        <div>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb || strDrinkThumb }
            alt={ strMeal || strDrink }
          />
        </div>
        <div>
          <span data-testid="recipe-title">{ strMeal || strDrink }</span>
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
        <div data-testid="recipe-category">{strCategory}</div>
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
                {historyDoneRecipes.id === id
                    && (historyDoneRecipes.arr.includes(index)
                    || doneRecipes.arr.includes(index))
                  ? (
                    <input
                      type="checkbox"
                      name="ingredient"
                      value={ index }
                      onChange={ () => handleRiscar(index) }
                      checked
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
                {historyDoneRecipes.id === id
                    && (historyDoneRecipes.arr.includes(index)
                    || doneRecipes.arr.includes(index))
                  ? (
                    <span className="riscado">{ingredient}</span>
                  )
                  : (
                    <span>{ingredient}</span>
                  )}

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
          disabled={ ingredients.length !== doneRecipes.arr.length }
          onClick={ handleSendDone }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
