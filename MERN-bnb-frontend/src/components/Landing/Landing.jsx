// src/components/Landing.jsx
import { Link } from 'react-router-dom';


const Landing = () => {

  return (
    <main>

      <h1>Welcome to Share BnB</h1>

      <div><Link to="/signin">Sign In</Link></div>
      <div><Link to="/signup">Sign Up</Link></div>

      <Link to="/signup/BnB"><button>Rent Your BnB</button></Link>
    </main>
  );
};

export default Landing;
