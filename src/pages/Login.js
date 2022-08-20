import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Login() {
  const { userEmail, setUserEmail, userSenha, setUserSenha } = useContext(Context);

  function validarEmail(email) {
    const regexE = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return setUserEmail({ user: { email, isValid: regexE.test(email) } });
  }

  function validarSenha(senha) {
    const MIN_CARACTERS = 6;
    // const regexS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z]{6,}$/i;
    return setUserSenha({ senha: { isValid: senha.length > MIN_CARACTERS } });
  }

  function hendleSendLogin() {
    console.log('Logado!!!');
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
        onClick={ hendleSendLogin }
      >
        Enter
      </button>
    </div>

  );
}
