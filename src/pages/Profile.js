import React from 'react';
import { useHistory } from 'react-router-dom';

import { Footer, Header } from '../components/index';

export default function Profile() {
  const history = useHistory();

  const handleLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <h1>{ JSON.parse(localStorage.getItem('user')).email }</h1>

      <a href="/done-recipes">
        <button type="button">Done Recipes</button>
      </a>

      <a href="/favorite-recipes">
        <button type="button">Favorite Recipes</button>
      </a>

      <button
        type="button"
        onClick={ handleLogoutButton }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
