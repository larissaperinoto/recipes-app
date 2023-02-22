import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { emailValidation, passwordValidation } from '../services/helpers';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(Context);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (emailValidation(email) && passwordValidation(password)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  function login() {
    const mealsToken = '1';
    const cocktailsToken = '1';

    localStorage.setItem('user', JSON.stringify({ email, password }));
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
    history.push('/foods');
  }

  return (
    <form>
      <input
        type="email"
        placeholder="Email"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <button
        type="button"
        disabled={ disabled }
        onClick={ login }
      >
        Enter
      </button>
    </form>
  );
}
