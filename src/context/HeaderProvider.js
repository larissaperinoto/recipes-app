import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';
import { requestMealsAPI, requestDrinksAPI } from '../services/requestMealsAndDrinksAPI';

function MyProvider({ children }) {
  const [search, setSearch] = useState({
    value: '',
    filter: '',
  });

  const handleSearchChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(false);
  const [path, setPath] = useState('');
  const [recipeId, setRecipeId] = useState({
    id: '',
    type: '',
  });

  const handleSearch = async () => {
    const { filter, value } = search;
    if (filter === 'First letter' && value.length !== 1) {
      setError(true);
    }
    if (path === 'Foods') {
      const data = await requestMealsAPI(filter, value);
      setRecipeId({
        id: data[0].idMeal,
        type: 'foods',
      });
      setSearchData(data);
    } else {
      const data = await requestDrinksAPI(filter, value);
      setRecipeId({
        id: data[0].idDrink,
        type: 'drinks',
      });
      setSearchData(data);
    }
  };

  const value = {
    handleSearchChange,
    handleSearch,
    error,
    setPath,
    searchData,
    recipeId,
  };

  return (
    <HeaderContext.Provider value={ value }>
      { children }
    </HeaderContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
