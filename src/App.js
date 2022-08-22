import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import {
  Login,
  Foods,
  Drinks,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
  Recipe } from './pages/index';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ Recipe } />
      <Route path="/drinks/:id" component={ Recipe } />
      <Route path="/foods/{id-da-receita}/in-progress" />
      <Route path="/drinks/{id-da-receita}/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
