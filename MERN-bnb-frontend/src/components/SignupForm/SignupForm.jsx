// SignupForm.jsx

import * as authService from '../../services/authService'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';
const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUserResponse = await authService.signup(formData)
      props.setUser(newUserResponse.user);
      navigate('/')
    } catch (err) {
      updateMessage(err.message)
    }
  }

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-container">
      <h1>Sign Up</h1>
      {message && <div className="signup-message">{message}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-field">
          <label htmlFor="username" className="signup-label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-field">
          <label htmlFor="password" className="signup-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-field">
          <label htmlFor="confirm" className="signup-label">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-actions">
          <button
            type="submit"
            className="signup-button"
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>
          <Link to="/">
            <button type="button" className="signup-cancel-button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
