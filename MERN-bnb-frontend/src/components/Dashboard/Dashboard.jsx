// src/components/Dashboard.jsx

import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import NavBar from '../NavBar/NavBar';


const Dashboard = ({handleSignout}) => {

  const user = useContext(AuthedUserContext);
    if (user.userType === 'traveller') {
      return (
      <main>
        <NavBar handleSignout={handleSignout} />
        <h1>Welcome, {user.username}</h1>
        <p>
        {console.log(user)}
          You are a {user.userType}
        </p>
        
      </main>
    );} else {
      return (
        <main>
          <NavBar handleSignout={handleSignout} />
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
  