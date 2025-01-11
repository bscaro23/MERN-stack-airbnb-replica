const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/apply`;

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

   const create = async (propertyId, applicationFormData) => {
      try {
        const res = await fetch(`${BASE_URL}/${propertyId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationFormData),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };

  export { 
    index,
    create
   };