import { useState, useEffect } from 'react';
import * as propertyService from '../../services/propertyService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PropertyForm = ({handleAddProperty, handleUpdateProperty}) => {

  const { propertyId } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyData = await propertyService.show(propertyId);
      setFormData(propertyData);
    };
    if (propertyId) fetchProperty();
  }, [propertyId]);

  
  

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    PriceMin: '',
    PriceMax: '',
    NoOfRooms: '',
    Location: '',
    Vibe: '',
  });

  const locations = [
    'Paris', 'New York', 'London', 'Tokyo', 'Dubai',
    'Rome', 'Bangkok', 'Barcelona', 'Singapore', 'Istanbul',
    'Sydney', 'Los Angeles', 'Cape Town', 'Bali', 'Hong Kong',
    'Amsterdam', 'Prague', 'Moscow', 'Las Vegas', 'Rio de Janeiro',
  ];

  const vibes = [
    'Romantic', 'Family-Friendly', 'Luxurious', 'Rustic',
    'Modern', 'Cozy', 'Beachy', 'Adventure-Ready',
    'Eco-Friendly', 'Urban Chic',
  ];

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (propertyId) {
      handleUpdateProperty(propertyId, formData);
    } else {
      handleAddProperty(formData);
    }
  };
  

  return (
    <main>
      <h1>{propertyId ? 'Edit Property' : 'Add New Property'}</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="PriceMin">Minimum Price:</label>
          <input
            type="number"
            id="PriceMin"
            name="PriceMin"
            value={formData.PriceMin}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="PriceMax">Maximum Price:</label>
          <input
            type="number"
            id="PriceMax"
            name="PriceMax"
            value={formData.PriceMax}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="NoOfRooms">Number of Rooms:</label>
          <input
            type="number"
            id="NoOfRooms"
            name="NoOfRooms"
            value={formData.NoOfRooms}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="Location">Location:</label>
          <select
            id="Location"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Vibe">Vibe:</label>
          <select
            id="Vibe"
            name="Vibe"
            value={formData.Vibe}
            onChange={handleChange}
            required
          >
            <option value="">Select a vibe</option>
            {vibes.map((vibe) => (
              <option key={vibe} value={vibe}>
                {vibe}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default PropertyForm;
