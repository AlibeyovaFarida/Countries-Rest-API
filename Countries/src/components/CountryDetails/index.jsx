import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryList } from "../../services/countryService";
import _ from 'lodash'
import "./style.scss";
const CountryDetails = () => {
  const [details, setDetails] = useState({});
  const [borderCodes,setBorderCodes] = useState([])
  const [borderCountries, setBorderCountries] = useState([])
  const navigate = useNavigate()
  const id = useParams().id;
  
  useEffect(() => {
    getCountryList().then((res) => {
      const detail = res.find((country) => country.cca2 === id);
      setDetails(detail);
      setBorderCodes(detail?.borders)
    });
  }, [id]);

  useEffect(() => {
    borderCodes?.map((code) => {
      fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((res) => res.json())
        .then((data) => setBorderCountries(prev => [...prev,...data]));
    })
  },[borderCodes])

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleBorderCountryDetails = (e) => {
    setBorderCountries([]);
    getCountryList().then((res) => {
      const detail = res.find((country) => country?.name?.common === e.target.textContent);
      setDetails(detail);
      setBorderCodes(detail?.borders);
    });
  }

  return (
    <div className="country-details">
      <button onClick={handleGoBack} className="back">Back</button>
      <div className="details">
        <div className="flag">
          <img src={details?.flags?.svg} alt="" />
        </div>
        <div className="desc">
          <h2>{details?.name?.common}</h2>
          <ul className="desc-details">
            <li>Native Name: {details?.name?.nativeName?.nld?.common}</li>
            <li>Population: {details?.population}</li>
            <li>Region: {details?.region}</li>
            <li>Sub Region: {details?.subregion}</li>
            <li>Capital: {details?.capital}</li>
            <li>Top Level Domain: {details?.tld}</li>
            <li>Currencies: {details?.currencies?.EUR?.name}</li>
            <li>
              Languages:
              {_.valuesIn(details?.languages).map((lg, index) => {
                return <span key={index}> {lg},</span>;
              })}
            </li>
          </ul>
          <div className="border-countries">
            <p>Border Countries: </p>
            {borderCountries.map((country,index) => {
              return <button key={index} onClick={(e) => handleBorderCountryDetails(e)}>{country?.name?.common}</button>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
