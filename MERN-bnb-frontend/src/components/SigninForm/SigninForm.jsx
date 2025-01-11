// SigninForm

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'; 

import './Signin.css';

const SigninForm = (props) => {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData); 

      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className="signin-container">
    
    <p className="signin-message">{message}</p>
    <form className="signin-form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="signin-field">
        <label htmlFor="username" className="signin-label">Username:</label>
        <input
          type="text"
          autoComplete="off"
          id="username"
          value={formData.username}
          name="username"
          onChange={handleChange}
          className="signin-input"
        />
      </div>
      <div className="signin-field">
        <label htmlFor="password" className="signin-label">Password:</label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          className="signin-input"
        />
      </div>
      <div className="signin-actions">
        <button className="signin-button signin-login">Log In</button>
      </div>
    </form>
  </main>
  );
};

export default SigninForm;
