import { Link } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthedUserContext } from '../../App';

import './NavBarBottom.css';

const NavBarBottom = () => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      { user ? (
        <nav className='bottom'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/property" >Properties</Link></li>
            {user.userType === 'traveller' ? (<li><Link to="/applications" >Applications</Link></li>) : 
            (<li><Link to="/property/new">NEW PROPERTY</Link></li>)}
          </ul>
        </nav>
      ) : (
        <nav>
          
        </nav>
      )}
    </>
  )
}

export default NavBarBottom;
