import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteAndShareButtons({ type, id, testIdShare, testIdFavorite }) {
  const {
    favoriteRecipes,
    handleFavoriteRecipes,
    isCopy,
    copyLink } = useContext(Context);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  console.log(favoriteRecipes);

  return (
    <main>
      <div>
        <div>
          <button
            type="button"
            onClick={ () => copyLink(type, id, testIdShare) }
            src={ shareIcon }
          >
            <img
              data-testid={ testIdShare }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          <button
            type="button"
            onClick={ () => handleFavoriteRecipes(type, id) }
          >
            <img
              data-testid={ testIdFavorite }
              alt="favoriteIcon"
              src={ favoriteRecipes.some((recipe) => Number(recipe.id) === Number(id))
                ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
          {isCopy && <p>Link copied!</p> }
        </div>
      </div>
    </main>
  );
}

FavoriteAndShareButtons.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  testIdShare: PropTypes.string,
  testIdFavorite: PropTypes.string,
}.isRequired;

export default FavoriteAndShareButtons;
