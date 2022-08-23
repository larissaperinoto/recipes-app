import React from 'react';
import { useHistory } from 'react-router-dom';
// import Context from '../context/Context';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();

  function getEmail() {
    return JSON.parse(localStorage.getItem('user')).email;
    // return localStorage.getItem('user');
  }

  function handleLogoutButton() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <h1 data-testid="profile-email">
        { getEmail() }
      </h1>

      <a href="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </a>

      <a href="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </a>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogoutButton }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
