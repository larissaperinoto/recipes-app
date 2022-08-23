import React from 'react';
import { useHistory } from 'react-router-dom';
// import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();

  function getEmail() {
    // return JSON.parse(localStorage.getItem('user')).email;
    // return localStorage.getItem('user');
    const userEmail = JSON.parse(localStorage.getItem('user'));
    return userEmail?.email;
  }

  function handleLogoutButton() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" />
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
