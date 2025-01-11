import { Link } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthedUserContext } from '../../App';
import { FaUserCog, FaSignOutAlt } from 'react-icons/fa';

import './NavBarTop.css'


const NavBarTop = ({  handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      { user ? (
        <nav className='top'>
          <ul>
            <li><Link to="/details"> <FaUserCog /> Details</Link></li>
            <li><Link to="" onClick={handleSignout} > <FaSignOutAlt /> Sign Out</Link></li>
            
          </ul>
        </nav>
      ) : (
        <nav>
          
        </nav>
      )}
    </>
  )
}

export default NavBarTop;