import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';

import { Footer, Header } from '../components/index';

export default function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user'));

  const handleLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <Container>
        <Stack alignItems="center">
          <Typography variant="h6" sx={ { m: 2 } }>
            { email }
          </Typography>
          <Button
            type="button"
            color="secondary"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={ () => handleLogoutButton() }
          >
            Logout
          </Button>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
