import React, { useContext, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
function FavoriteButton() {
  const {
    recipeDetails,
    isFavorite,
    setIsFavorite,
    isCopy,
    setisCopy,
    isFavoriteId,
    setIsFavoriteId,
  } = useContext(Context);
  const history = useHistory();
  function copyLink({ target }) {
    const { details } = recipeDetails;// conteudo da receita recebido pela página RecipeInProgress
    const tipo = history.location.pathname.split('/')[1]; // Id da receita obtido por history
    if (target.name === 'shareBtn') {
      clipboardCopy(window.location.href.replace(/\/in-progress/i, ''));
      setisCopy(!isCopy);
    } else {
      setIsFavorite(target.name === 'favoriteBtn' && !isFavorite);
    }
    const getfavorites = JSON.parse((localStorage.getItem('favoriteRecipes')));
    const favoriteRecipes = {
      id: tipo === 'drinks' ? details.idDrink : details.idMeal,
      type: tipo === 'drinks' ? 'drink' : 'food',
      nationality: Object.keys(details).includes('strArea') ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: Object.keys(details).includes('strAlcoholic')
        ? details.strAlcoholic : '',
      name: tipo === 'drinks' ? details.strDrink : details.strMeal,
      image: tipo === 'drinks' ? details.strDrinkThumb : details.strMealThumb,
    };
    const tipoId = history.location.pathname.split('/')[2]; // Id da receita obtido por history
    if (getfavorites.some((so) => so.id === tipoId)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...getfavorites
          .filter((getfa) => getfa.id !== favoriteRecipes.id)]));
      setIsFavoriteId(!isFavoriteId);
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...getfavorites, favoriteRecipes]));
      setIsFavoriteId(!isFavoriteId);
    }
  }
  useEffect(() => {
    const getfavorites = JSON.parse((localStorage.getItem('favoriteRecipes')));
    if (getfavorites === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (getfavorites) {
      const tipoId = history.location.pathname.split('/')[2];
      setIsFavoriteId(getfavorites.some((so) => so.id === tipoId));
    }
    if (isFavorite === false) {
      clipboardCopy('');
    }
  }, [isFavoriteId, isFavorite]);
  return (
    <main>
      <div>
        <div>
          <button
            type="button"
            name="shareBtn"
            onClick={ copyLink }
            src={ shareIcon }
          >
            <img
              data-testid="share-btn"
              name="shareBtn"
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          <button
            type="button"
            onClick={ copyLink }
            name="favoriteBtn"
          >
            <img
              data-testid="favorite-btn"
              name="favoriteBtn"
              src={ isFavoriteId ? blackHeartIcon : whiteHeartIcon }
              alt="shareIcon"
            />
          </button>
          {isCopy && <p>Link copied!</p> }
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
export default FavoriteButton;