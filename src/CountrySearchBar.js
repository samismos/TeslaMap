import React, { useState, useEffect } from 'react';
import './Map.css';
import axios from 'axios';

const CountrySearchBar = ({ onSelectCountry, selectedCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('geojson/countries.geojson')
      .then((response) => {
        // Assuming the response data has the structure { type: 'FeatureCollection', features: [...] }
        // Here, we extract the features array from the response and set it as the value of countries.
        if (Array.isArray(response.data?.features)) {
          const sortedCountries = response.data.features.sort((a, b) =>
          a.properties.ADMIN.localeCompare(b.properties.ADMIN)
        );
        setCountries(sortedCountries);
        }
      })
      .catch((error) => {
        console.error('Error fetching country data', error);
      });
  }, []);

    //const sortedCountries = [...countries].sort();
  //setCountries(sortedCountries);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    onSelectCountry(selectedCountry); // Notify the parent component (Map) about the selected country
  };

  return (
    <div className="CountrySearchBar">
      {/* Search Bar (Dropdown) */}
      <select onChange={handleCountryChange} value={selectedCountry}>
        <option value="">Select a country</option>
        {countries.map((feature) => (
          <option key={feature.properties.ADMIN} value={feature.properties.ADMIN}>
            {feature.properties.ADMIN}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySearchBar;
