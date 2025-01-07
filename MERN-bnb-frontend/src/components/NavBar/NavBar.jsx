import { Link } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthedUserContext } from '../../App';

const NavBar = ({  handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      { user ? (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="" onClick={handleSignout} >Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signup/BnB">Sign Up BnB</Link></li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default NavBar;
