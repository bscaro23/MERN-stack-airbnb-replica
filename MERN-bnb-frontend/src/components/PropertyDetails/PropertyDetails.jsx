// src/components/PropertyDetails/PropertyDetails.jsx

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as propertyService from '../../services/propertyService';

const PropertyDetails = (props) => {
    const [property, setProperty] = useState(null);
    const { propertyId } = useParams();

    useEffect(() => {
        const fetchProperty = async () => {
          const propertyData = await propertyService.show(propertyId);
          console.log('propertyData', propertyData);
          setProperty(propertyData);
        };
        fetchProperty();
      }, [propertyId]);

    if (!property) return <main>Loading...</main>;

    return (
        <article>
          <h2>{property.Name}</h2>
          <p>
            <strong>Price Range:</strong> ${property.PriceMin} - ${property.PriceMax}
          </p>
          <p>
            <strong>Number of Rooms:</strong> {property.NoOfRooms}
          </p>
          <p>
            <strong>Location:</strong> {property.Location}
          </p>
          <p>
            <strong>Vibe:</strong> {property.Vibe}
          </p>

          <h2>Applicants:</h2>
          
        </article>
    )
}

export default PropertyDetails