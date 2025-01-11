// SignupForm.jsx

import * as authService from '../../services/authService'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './SignupBnBForm.css';

const SignupBnBForm = (props) => {
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
      const newUserResponse = await authService.signupBnB(formData)
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
    <main className="signup-bnb-container">
      <h1>Sign Up To Let</h1>
      {message && <div className="signup-bnb-message">{message}</div>}
      <form onSubmit={handleSubmit} className="signup-bnb-form">
        <div className="signup-bnb-field">
          <label htmlFor="username" className="signup-bnb-label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            className="signup-bnb-input"
          />
        </div>
        <div className="signup-bnb-field">
          <label htmlFor="password" className="signup-bnb-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            className="signup-bnb-input"
          />
        </div>
        <div className="signup-bnb-field">
          <label htmlFor="confirm" className="signup-bnb-label">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            className="signup-bnb-input"
          />
        </div>
        <div className="signup-bnb-actions">
          <button
            type="submit"
            className="signup-bnb-button"
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>
          <Link to="/">
            <button type="button" className="signup-bnb-cancel-button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupBnBForm;
