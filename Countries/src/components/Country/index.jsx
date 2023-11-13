import React from 'react'
import { Link } from 'react-router-dom';
import './styles.scss'
const Country = ({ id, name, flag, population, region, capital }) => {
  return (
    <Link to={`/details/${id}`} className="country">
      <div className="country-flag">
        <img src={flag} alt="" />
      </div>
      <div className="country-less-details">
        <h3 className="name">{name}</h3>
        <ul className="description">
          <li className="population">Population: {population}</li>
          <li className="region">Region: {region}</li>
          <li className="capital">Capital: {capital}</li>
        </ul>
      </div>
    </Link>
  );
};

export default Country