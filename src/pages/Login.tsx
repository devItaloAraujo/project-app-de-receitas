function Login() {
  return (
    <form>
      <input type="text" data-testid="email-input" />
      <input type="text" data-testid="password-input" />
      <button data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
