import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio } from '@mui/material';
import Context from '../../context/Context';
import {
  requestMealsAPI,
  requestDrinksAPI } from '../../services/requestMealsAndDrinksAPI';

export default function SearchBar() {
  const { setSearchData, search, setError, handleSearchChange } = useContext(Context);
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];

  const handleSearch = async () => {
    const { filter, value } = search;
    if (filter === 'First letter' && value.length !== 1) {
      setError('Your search must have only 1 (one) character');
    }
    const data = path === 'foods'
      ? await requestMealsAPI(filter, value) : await requestDrinksAPI(filter, value);

    if (data) {
      setSearchData(data);
    } else {
      setError('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <FormControl sx={ { mt: 2, ml: 2 } }>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Ingredient"
        name="radio-buttons-group"
        onChange={ handleSearchChange }
      >
        <FormControlLabel value="Ingredient" control={ <Radio /> } label="Ingredient" />
        <FormControlLabel value="Name" control={ <Radio /> } label="Name" />
        <FormControlLabel
          value="First letter"
          control={ <Radio /> }
          label="First letter"
        />
      </RadioGroup>
      <TextField
        type="text"
        size="small"
        margin="dense"
        onChange={ handleSearchChange }
      />
      <Button
        type="button"
        variant="contained"
        color="secondary"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Search
      </Button>
    </FormControl>
  );
}
