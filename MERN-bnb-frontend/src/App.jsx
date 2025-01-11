// App.jsx
import './App.css';

import * as authService from '../src/services/authService';
import * as propertyService from '../src/services/propertyService';
import * as applicationService from '../src/services/applicationService';
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
import Apply from './components/Apply/Apply';
import NavBarBottom from './components/NavBarBottom/NavBarBottom';
import NavBarTop from './components/NavBarTop/NavBarTop';

export const AuthedUserContext = createContext(null);



const App = () => {
  const [user, setUser] = useState(authService.getUser()); 
  const [property, setProperty] = useState([]);
  const [myProperty, setMyProperty] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  
  const handleAddProperty = async (propertyFormData) => {
    const newProperty = await propertyService.create(propertyFormData);
    setProperty([newProperty, ...property])
    navigate('/property');
  } 

  useEffect(() => {
    const fetchAllProperty = async () => {
      const propertyData = await propertyService.index();
      setProperty(propertyData);
    };
    if (user) fetchAllProperty();
  }, [user]);

  useEffect(() => {
    const fetchMyProperty = async () => {
      const myPropertyData = await propertyService.indexMyProperties();
      setMyProperty(myPropertyData);
    };
    if (user && user.userType === 'bnb') fetchMyProperty();
  }, [user]);

  useEffect(() => {
    const fetchAllApplications = async () => {
      const applicationData = await applicationService.index();
      console.log(applicationData);
      setApplications(applicationData.applications);
    };
    if (user) fetchAllApplications();
  }, [user]);

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleUpdateProperty = async (propertyId, propertyFormData) => {
    const updatedProperty = await propertyService.update(propertyId, propertyFormData);
  
    setProperty(property.map((property) => (propertyId === property._id ? updatedProperty : property)));
  
    navigate(`/property/${propertyId}`);
  };

  const handleAddApplication = async (propertyId, applicationFormData) => {
    const newApplication = await applicationService.create(propertyId, applicationFormData);
    setApplications([newApplication, ...applications])
    navigate('/property');
  }
  



  return (
    <AuthedUserContext.Provider value={user}>
      <NavBarTop handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard handleSignout={handleSignout} property={property} handleAddProperty={handleAddProperty} />} />
        ) : (
          <Route path="/" element={<Landing setUser={setUser} />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signup/BnB" element={<SignupBnBForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/property" element={<PropertyList property={property} />} />
        <Route path='/property/myproperty' element={<PropertyList property={myProperty} />} />
        <Route path="/property/new" element={<PropertyForm handleAddProperty={handleAddProperty} />} />
        <Route path="/property/:propertyId" element={<PropertyDetails/>} />
        <Route path="/property/:propertyId/edit" element={<PropertyForm />} />
        
        <Route
          path="/property/:propertyId/edit"
          element={<PropertyForm handleUpdateProperty={handleUpdateProperty} />}
        />
        <Route
          path="/property/:propertyId/apply"
          element={<Apply handleAddApplication={handleAddApplication} />}
        />
      </Routes>
      <NavBarBottom />
    </AuthedUserContext.Provider>
  );
};

export default App;



//Todo add the index page which will link the application with the right property.
