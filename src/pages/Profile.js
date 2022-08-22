import React from 'react';
// import { useHistory } from 'react-router-dom';
// import Context from '../context/Context';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <div>
      <h1 data-testid="profile-email">
        { JSON.parse(localStorage.getItem('user')).email }
      </h1>

      <a href="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </a>

      <a href="/">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </a>

      <a href="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </a>
      <Footer />
    </div>
  );
}
