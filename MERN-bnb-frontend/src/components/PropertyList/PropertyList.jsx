// src/component/PropertyList/PropertyList.jsx

import {Link} from 'react-router-dom';
import './PropertyList.css'

const PropertyList = ({property, myProperty}) => {
    
    const isMyList = myProperty
    return (
        <main>
            <h1>Property List</h1>
            {property.map((property) => (
              <Link key={property._id} to={`/property/${property._id}`} className="property-card">
                <article className="property-card-content">
                  <div className="property-image">
                    
                  </div>
                  <div className="property-details">
                    <h1>{property.NoOfRooms} Bed</h1>
                    <h2>{property.Location}</h2>
                    {isMyList && property.Applications.map((application) => (
                      <Link key={application._id} to={`/property/${property._id}/approve/${application._id}`}>
                        <div className="application-details">
                          <p>From {application.startDate} To {application.endDate} by {application.Applicant}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
        </main>
    )
}

export default PropertyList