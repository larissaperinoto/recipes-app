import React, { useContext, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { string, number } from 'prop-types';
import { Container, IconButton } from '@mui/material';

import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteAndShareButtons({ type, id, testIdShare, testIdFavorite, replace }) {
  const {
    favoriteRecipes,
    setFavoriteRecipes,
    setFilterFavoriteRecipes,
    recipeDetails,
    isCopy,
    setIsCopy } = useContext(Context);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFilterFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [favoriteRecipes]);

  function copyLink() {
    if (testIdShare === 'share-btn') {
      clipboardCopy(window.location.href.replace(`/${replace}`, ''));
      setIsCopy(!isCopy);
    } else {
      clipboardCopy(window.location.href.replace(`/${replace}`, `/${type}s/${id}`));
      setIsCopy(true);
    }
  }

  const handleFavoriteRecipes = (paramType, paramId) => {
    if (favoriteRecipes.some((recipe) => recipe.id === paramId)) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== paramId));
    } else {
      const { details } = recipeDetails;
      setFavoriteRecipes([
        ...favoriteRecipes,
        { id,
          type,
          nationality: paramType === 'food' ? details.strArea : '',
          category: details.strCategory,
          alcoholicOrNot: paramType === 'food' ? '' : details.strAlcoholic,
          name: details.strMeal || details.strDrink,
          image: details.strMealThumb || details.strDrinkThumb,
        },
      ]);
    }
  };

  return (
    <Container sx={ { mb: 3, textAlign: 'justify' } }>
      <IconButton
        type="button"
        onClick={ () => copyLink() }
        src={ shareIcon }
        title="Share"
      >
        <img
          data-testid={ testIdShare }
          src={ shareIcon }
          alt="Share"
        />
      </IconButton>
      <IconButton
        type="button"
        title="Like"
        onClick={ () => handleFavoriteRecipes(type, id) }
      >
        <img
          data-testid={ testIdFavorite }
          alt={ favoriteRecipes.some((recipe) => Number(recipe.id) === Number(id))
            ? 'blackHeartIcon' : 'whiteHeartIcon' }
          src={ favoriteRecipes.some((recipe) => Number(recipe.id) === Number(id))
            ? blackHeartIcon : whiteHeartIcon }
        />
      </IconButton>
      {isCopy && <p>Link copied!</p> }
    </Container>
  );
}

FavoriteAndShareButtons.propTypes = {
  type: string,
  id: number,
  testIdShare: string,
  testIdFavorite: string,
  replace: string,
}.isRequired;

export default FavoriteAndShareButtons;
