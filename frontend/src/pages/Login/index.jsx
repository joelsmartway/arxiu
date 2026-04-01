import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services';
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login({ username, password });

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.error("Login failed", err);
    }

  };

  return (
    <div>
      <div className='Login__container'>
        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="field">
            <input
              type="username"
              id="username"
              required
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="field">
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && (
          <div className='Login__error'>
            Try again Invalid credentials
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
