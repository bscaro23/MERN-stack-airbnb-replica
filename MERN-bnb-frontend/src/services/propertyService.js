// src/services/properyService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/property`;


const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const indexMyProperties = async () => {
    try {
      const res = await fetch(`${BASE_URL}/myproperty`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const show = async (propertyId) => {
    try {
      const res = await fetch(`${BASE_URL}/${propertyId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const create = async (propertyFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function update(propertyId, propertyFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${propertyId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  
  export { 
    index,
    show,
    create,
    update,
    indexMyProperties,
   };