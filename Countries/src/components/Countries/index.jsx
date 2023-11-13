import React from 'react'
import Country from '../Country';
import './style.scss'
const Countries = ({ countryList }) => {
  return (
    <div className="countries">
      {countryList.map((country) => {
        return (
          <Country
            key={country.cca2}
            id={country.cca2}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital}
          />
        );
      })}
    </div>
  );
};

export default Countries