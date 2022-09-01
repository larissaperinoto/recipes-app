import React, { useContext, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';

import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteAndShareButtons({ type, id, testIdShare, testIdFavorite, replace }) {
  const {
    favoriteRecipes,
    handleFavoriteRecipes,
    isCopy,
    setIsCopy } = useContext(Context);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  function copyLink() {
    if (testIdShare === 'share-btn') {
      console.log(replace);
      clipboardCopy(window.location.href.replace(`/${replace}`, ''));
      setIsCopy(!isCopy);
    } else {
      clipboardCopy(window.location.href.replace(`/${replace}`, `/${type}s/${id}`));
      setIsCopy(true);
    }
  }

  return (
    <main>
      <div>
        <div>
          <button
            type="button"
            onClick={ () => copyLink() }
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
              alt={ favoriteRecipes.some((recipe) => Number(recipe.id) === Number(id))
                ? 'blackHeartIcon' : 'whiteHeartIcon' }
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
  replace: PropTypes.string,
}.isRequired;

export default FavoriteAndShareButtons;
