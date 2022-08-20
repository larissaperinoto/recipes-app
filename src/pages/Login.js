import React from 'react';

export default function Login() {
  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
        />
      </form>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>

  );
}
