import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Login attempted with:', { email, password });
      // Call onLogin callback to navigate to dashboard
      if (onLogin) {
        onLogin({ email, password });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Left side - Login Form */}
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h2 className="welcome-text">Welcome</h2>
          <h1 className="login-title">Log In</h1>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {showPassword ? (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    ) : (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#forgot">Lupa kata sandi ?</a>
            </div>

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          <div className="signup-section">
            <span>Don't have an account ? </span>
            <a href="#signup">Sign Up</a>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="login-illustration-section">
        <div className="illustration-content">
          <h2>PantauFarm</h2>


          {/* Illustration - Simple SVG or Image placeholder */}
          <svg
            className="illustration-graphic"
            viewBox="0 0 400 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Farmers illustration - simplified */}
            <g>
              {/* Background elements */}
              <circle cx="100" cy="80" fill="rgba(255,255,255,0.1)" r="60" />
              <circle cx="300" cy="150" fill="rgba(255,255,255,0.1)" r="80" />

              {/* Farmer figures - simplified */}
              <g transform="translate(80, 150)">
                <circle cx="0" cy="-20" fill="#FFB366" r="12" />
                <rect x="-10" y="0" width="20" height="30" fill="#FF9F43" />
                <rect x="-15" y="5" width="10" height="25" fill="#FF9F43" />
                <rect x="5" y="5" width="10" height="25" fill="#FF9F43" />
              </g>

              <g transform="translate(180, 140)">
                <circle cx="0" cy="-25" fill="#FFD9A8" r="14" />
                <rect x="-12" y="0" width="24" height="35" fill="#A0826D" />
                <rect x="-18" y="10" width="12" height="25" fill="#A0826D" />
                <rect x="6" y="10" width="12" height="25" fill="#A0826D" />
              </g>

              <g transform="translate(280, 160)">
                <circle cx="0" cy="-20" fill="#FFB366" r="12" />
                <rect x="-10" y="0" width="20" height="28" fill="#F4D35E" />
                <rect x="-14" y="5" width="9" height="23" fill="#F4D35E" />
                <rect x="5" y="5" width="9" height="23" fill="#F4D35E" />
              </g>

              {/* Simple plants/crops */}
              <g transform="translate(150, 180)">
                <line x1="0" y1="40" x2="0" y2="0" stroke="#8B7355" strokeWidth="3" />
                <circle cx="-8" cy="10" fill="#7CB342" r="6" />
                <circle cx="8" cy="15" fill="#7CB342" r="6" />
              </g>

              {/* Clouds */}
              <ellipse cx="250" cy="50" rx="30" ry="15" fill="white" opacity="0.8" />
              <ellipse cx="270" cy="45" rx="25" ry="12" fill="white" opacity="0.8" />
            </g>
          </svg>

          <h3 className="illustration-title">Get the best premium food</h3>
          <p className="illustration-description">
            You can get the best premium food with the best price only in <strong>HERE !</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
