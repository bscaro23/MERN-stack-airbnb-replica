// App.jsx

import * as authService from '../src/services/authService';
import * as propertyService from '../src/services/propertyService';
import { createContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm' 
import SigninForm from './components/SigninForm/SigninForm'
import SignupBnBForm from './components/SignupFormBnB/SignupBnBForm';
import PropertyList from './components/PropertyList/PropertyList';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import PropertyForm from './components/PropertyForm/PropertyForm';

export const AuthedUserContext = createContext(null);



const App = () => {
  const [user, setUser] = useState(authService.getUser()); 
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  
  const handleAddProperty = async (propertyFormData) => {
    const newProperty = await propertyService.create(propertyFormData);
    StylePropertyMap([newProperty, ...property])
    navigate('/property');
  } 

  useEffect(() => {
    const fetchAllProperty = async () => {
      const propertyData = await propertyService.index();
      console.log(propertyData);
      setProperty(propertyData);
    };
    if (user) fetchAllProperty();
  }, [user]);

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  console.log(property);

  return (
    <AuthedUserContext.Provider value={user}>
      
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard handleSignout={handleSignout} property={property} handleAddProperty={handleAddProperty} />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signup/BnB" element={<SignupBnBForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/property" element={<PropertyList property={property} />} />
        <Route path="/property/new" element={<PropertyForm handleAddProperty={handleAddProperty} />} />
        <Route path="/property/:propertyId" element={<PropertyDetails/>} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;

//Todo