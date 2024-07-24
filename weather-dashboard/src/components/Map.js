import React from 'react';

const Map = ({ city }) => {
  if (!city) return null;

  return (
    <div>
      <h2>Map of {city}</h2>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${city}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
