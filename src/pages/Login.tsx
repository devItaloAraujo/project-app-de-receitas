import { useEffect, useState } from 'react';

function Login() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(email);
    const IsValidPassword = password.length > 6;
    const valid = validEmail && IsValidPassword ? setDisabled(true) : setDisabled(false);
  }, [email, password]);

  const handleSubmit = () => {
    setDisabled(true);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ (event) => setEmail(event.target.value) }
      />
      <input
        type="text"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ (event) => setPassword(event.target.value) }
      />
      { disabled
        ? <button data-testid="login-submit-btn">Enter</button>
        : <button data-testid="login-submit-btn" disabled>Enter</button> }
    </form>
  );
}

export default Login;
