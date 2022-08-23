import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function Login() {
  const { userEmail, setUserEmail, userSenha, setUserSenha } = useContext(Context);
  const history = useHistory();

  function validarEmail(email) {
    const regexE = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return setUserEmail({ user: { email, isValid: regexE.test(email) } });
  }

  function validarSenha(senha) {
    const MIN_CARACTERS = 6;
    // const regexS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z]{6,}$/i;
    return setUserSenha({ senha: { isValid: senha.length > MIN_CARACTERS } });
  }

  function handleSendLogin() {
    const sendUser = {
      email: userEmail.user.email,
    };
    const mealsToken = '1';
    const cocktailsToken = '1';

    localStorage.setItem('user', JSON.stringify(sendUser));
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
    history.push('/foods');
  }

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          value={ userEmail.email }
          onChange={ (ev) => validarEmail(ev.target.value) }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={ (ev) => validarSenha(ev.target.value) }
        />
      </form>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(userEmail.user.isValid && userSenha.senha.isValid) }
        onClick={ handleSendLogin }
      >
        Enter
      </button>
    </div>
  );
}
