import  { useState } from 'react';
import './SearchBar.css'; // You can add this CSS styling in a separate file

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar-container">
     
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Find your next stay ..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        

        
      </div>
    </div>
  );
};

export default SearchBar;
