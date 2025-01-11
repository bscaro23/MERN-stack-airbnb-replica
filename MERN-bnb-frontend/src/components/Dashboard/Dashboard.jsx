// src/components/Dashboard.jsx

import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './Dashboard.css';

const Dashboard = () => {

  const user = useContext(AuthedUserContext);
    if (user.userType === 'traveller') {
      return (
      <main className='dashboard'>
        
        <h1 className='dashboard-title'>Welcome - {user.username} </h1>
        <p className='dashboard-title'>
          Lets find your next destination ...
        </p>
        < SearchBar />
        <div className='category-container'>
        <Link to="/beach-home" className="category-link" id="beach-home">
        <div className="category-content">
          <h2>Beachfront Homes</h2>
          
        </div>
      </Link>

      <Link to="/mountain-cabin" className="category-link" id="mountain-cabin">
        <div className="category-content">
          <h2>Mountain Cabins</h2>
        </div>
      </Link>

      <Link to="/city-apartment" className="category-link" id="city-apartment">
        <div className="category-content">
          <h2>City Apartments</h2>
        </div>
      </Link>

      <Link to="/countryside-villa" className="category-link" id="countryside-villa">
        <div className="category-content">
          <h2>Countryside Villas</h2>
        </div>
      </Link>
      </div>
      </main>
    );} else {
      return (
        <main>
          
          <h1>Welcome, {user.username}</h1>
          <p>
            {console.log(user)}
            You are a {user.userType}
          </p>

        </main>
      )
    }

    
  };
  
  export default Dashboard;
  