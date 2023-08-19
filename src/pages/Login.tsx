import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function Login() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { valueStorage, setValue } = useLocalStorage('user', { [email]: email });

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(email);
    const IsValidPassword = password.length > 6;
    const valid = validEmail && IsValidPassword ? setDisabled(true) : setDisabled(false);
  }, [email, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({ [email]: email });
    setDisabled(true);
  };

  return (
    <form onSubmit={ (event) => handleSubmit(event) }>
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
        : <button data-testid="login-submit-btn" disabled={ disabled }>Enter</button> }
    </form>
  );
}

export default Login;
