//src/component.Apply/Apply.jsx

import { useState, Link } from "react";
import { DateRangePicker } from "react-date-range";
import { useParams } from 'react-router-dom';
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import "./Apply.css";

const Apply= ({handleAddApplication}) => {

    const { propertyId } = useParams();
    const [message, setMessage] = useState('');
    const [applicationFormData, setApplicationFormData] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setApplicationFormData([ranges.selection]); 
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddApplication(propertyId, applicationFormData)
    
    }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select a Date Range</h2>
      <DateRangePicker
        className="custom-calendar"
        ranges={applicationFormData}
        onChange={handleSelect}
        showDateDisplay={false}
        renderCalendarInfo={() => null}
        staticRanges={[]} // Remove the default quick selection options like "Today", "Last 7 Days"
        inputRanges={[]}
      />
      <div>
        <p>
          <strong>Start Date:</strong> {applicationFormData[0].startDate.toDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {applicationFormData[0].endDate.toDateString()}
        </p>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Apply;
