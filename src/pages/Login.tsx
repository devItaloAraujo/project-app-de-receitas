import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import './Login.css';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setValue } = useLocalStorage('user', { email });
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(email);
    const IsValidPassword = password.length > 6;
    return !validEmail || !IsValidPassword ? setDisabled(true) : setDisabled(false);
  }, [email, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({ email });
    setDisabled(true);
    navigate('/meals');
  };

  return (
    <div className="Login">
      <img
        src="src/images/logo-Recipes-App.png"
        alt="logo do App"
      />
      <form onSubmit={ (event) => handleSubmit(event) } className="form-container">
        <h2>LOGIN</h2>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          className="input-form"
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
          className="input-form"
        />
        <button
          data-testid="login-submit-btn"
          disabled={ disabled }
          className="button-form"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
