// src/component/PropertyList/PropertyList.jsx

import {Link} from 'react-router-dom';

const PropertyList = ({property}) => {
    return (
        <main>
            <h1>Property List</h1>
            {property.map((property) => (
                <Link key={property._id} to={`/property/${property._id}`} >
                    <article>
                        <h1>{property.PriceMin}</h1>
                        <h2>{property.Location}</h2>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default PropertyList