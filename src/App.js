import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Footer } />
          <Route path="/drinks" component={ Footer } />
          {/* <Route path="/foods/{id-da-receita}" component={ } />
          <Route path="/drinks/{id-da-receita}" component={ } />
          <Route path="/foods/{id-da-receita}/in-progress" component={ } />
          <Route path="/drinks/{id-da-receita}/in-progress" component={ } /> */}
          <Route path="/profile" component={ Footer } />
          <Route path="/done-recipe" component="" />
          <Route path="/favorite-recipes" component="" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
