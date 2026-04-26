import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { Library, Lock, User } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) navigate('/');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await login({ username, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <div className="login-header">
          <div className="logo-icon">
            <Library size={40} className="text-primary" />
          </div>
          <h2>Welcome Back</h2>
          <p>Login to manage your library</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="text-primary font-semibold">Register here</Link></p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-icon {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .input-wrapper input {
          padding-left: 40px !important;
        }

        .login-btn {
          width: 100%;
          padding: 0.875rem;
          background: var(--primary);
          color: white;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          margin-top: 1rem;
        }

        .login-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-alert {
          background: #fee2e2;
          color: #991b1b;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          text-align: center;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
