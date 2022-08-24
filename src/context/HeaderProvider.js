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
  const [error, setError] = useState('');
  const [path, setPath] = useState('');

  const handleSearch = async () => {
    const { filter, value } = search;
    if (filter === 'First letter' && value.length !== 1) {
      setError('Your search must have only 1 (one) character');
    }
    if (path === 'Foods') {
      const data = await requestMealsAPI(filter, value);
      if (data) {
        setSearchData(data);
      } else {
        setError('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else {
      const data = await requestDrinksAPI(filter, value);
      if (data) {
        setSearchData(data);
      } else {
        setError('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  const value = {
    handleSearchChange,
    handleSearch,
    error,
    setPath,
    searchData,
    setSearchData,
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
