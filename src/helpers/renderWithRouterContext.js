import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';

export function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithContext(component, initialPath = '/') {
  const history = createMemoryHistory([initialPath]);
  return {
    ...render(
      <Provider>
        {component}
      </Provider>,
      history,
    ),
  };
}
