import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const data = await login({email,password});
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/dashboard", {replace: true});
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Smart Work Tracker</h1>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="auth-footer">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
