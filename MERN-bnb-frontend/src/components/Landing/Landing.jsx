// src/components/Landing.jsx
import { Link } from 'react-router-dom';


import SigninForm from '../SigninForm/SigninForm'

import './Landing.css';

const Landing = ({setUser}) => {

  return (
    <main className="main-container">
      <div className='title-box'>
      <h1 className="main-title">Welcome</h1>
      <h2 className='main-title'>to</h2>
      <h1 className='main-title'>ShareBnB</h1>
      </div>
      <SigninForm setUser={setUser} />
      <div className="signup-link">
        <Link to="/signup">Sign Up</Link>
      </div>
      <Link to="/signup/BnB">
        <button className="rent-bnb-button">Rent Your BnB</button>
      </Link>
    </main>
  );
};

export default Landing;
