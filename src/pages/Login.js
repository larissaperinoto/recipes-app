import React, { useContext, useEffect, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { emailValidation, passwordValidation } from '../services/helpers';
import '../styles/Login.css';

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
    <div className="login_container">
      <img src="https://img.icons8.com/cotton/64/null/chinese-noodle.png" alt="Box's noodle" />
      <FormControl>
        <TextField
          required
          margin="dense"
          size="small"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <TextField
          required
          margin="dense"
          size="small"
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <Button
          type="button"
          color="secondary"
          variant="contained"
          disabled={ disabled }
          onClick={ () => login() }
        >
          Enter
        </Button>
      </FormControl>
    </div>
  );
}
