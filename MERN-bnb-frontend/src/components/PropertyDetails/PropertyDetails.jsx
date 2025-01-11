// src/components/PropertyDetails/PropertyDetails.jsx

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';


import { AuthedUserContext } from '../../App';

import * as propertyService from '../../services/propertyService';

import './PropertyDetails.css';

const PropertyDetails = (props) => {
    const [property, setProperty] = useState(null);
    const { propertyId } = useParams();
    

    const user = useContext(AuthedUserContext);

    

    useEffect(() => {
        const fetchProperty = async () => {
          const propertyData = await propertyService.show(propertyId);
          console.log('propertyData', propertyData);
          setProperty(propertyData);
        };
        fetchProperty();
      }, [propertyId]);

      

      if (!property) return <div className="loading-state">Loading...</div>;

      return (
        <article className="property-details-container">
          <div
        className="property-image" ></div>
          <h2>{property.Name}</h2>
    
          <div className="property-info">
            <p><strong>Price Range:</strong> ${property.PriceMin} - ${property.PriceMax}</p>
            <p><strong>Number of Rooms:</strong> {property.NoOfRooms}</p>
            <p><strong>Location:</strong> {property.Location}</p>
            <p><strong>Vibe:</strong> {property.Vibe}</p>
          </div>
    
          <div className="property-details-buttons">
            {(user.userType === 'traveller') && (
              <Link to={`/property/${property._id}/apply`}>
                <button className="apply-button">Apply</button>
              </Link>
            )}
            {(user.userType === 'bnb' && user._id === property.Owner._id) && (
              <Link to={`/property/${property._id}/edit`}>
                <button>Edit</button>
              </Link>
            )}
          </div>
        </article>
      );
    };

export default PropertyDetails