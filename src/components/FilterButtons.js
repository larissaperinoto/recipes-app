import React, { useContext } from 'react';
import { string } from 'prop-types';
import { Button, Container } from '@mui/material';
import Context from '../context/Context';

export default function FilterButtons({ page }) {
  const { handleFilters } = useContext(Context);
  const filterButtons = ['All', 'Food', 'Drinks'];

  return (
    <Container sx={ { textAlign: 'center' } }>
      {filterButtons.map((buttonText, index) => (
        <Button
          key={ index }
          type="button"
          size="large"
          color="secondary"
          name={ buttonText.toLowerCase() }
          onClick={ (event) => handleFilters(event, page) }
        >
          { buttonText }
        </Button>))}
    </Container>
  );
}

FilterButtons.propTypes = {
  page: string,
}.isRequired;
