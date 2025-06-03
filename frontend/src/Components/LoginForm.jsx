import { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login } from '../services/auth';
import './LoginForm.css'; // Importing the external CSS
import {useNavigate} from 'react-router-dom'


const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(credentials);
navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-error">{error}</div>}

        <div className="login-group">
          <label>Email</label>
          <div className="login-input-wrapper">
            <FiMail className="login-icon" />
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="login-group">
          <label>Password</label>
          <div className="login-input-wrapper">
            <FiLock className="login-icon" />
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <p className="login-terms">
          By signing in you agree to our <a href="#">Terms</a> and <a href="#">privacy policy</a>.
        </p>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>


        <div className="login-footer">
          <p>
            New user?{' '}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
