import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup({
        name,
        email,
        password,
      });

      setSuccess("Account created successfully. Please login.");
      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to create account:", error);
      setError("Failed to create account. Email may already be registered.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Smart Work Tracker</h1>
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

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

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
