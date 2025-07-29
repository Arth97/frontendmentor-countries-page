import React, { useEffect } from 'react';
import './countryCard.css';
import { useNavigate } from 'react-router'

const CountryCard = ({country}) => {

  const navigate = useNavigate()

  return (
    <div className="country-card" onClick={() => navigate(`/countryDetail/${country.cca3}`)}>
      <div className="flag">
        <img src={country?.flags?.svg} alt="Flag" className="flag-img" />
      </div>
      <div className="card-content">
        <h2 className="country-name">{country?.name?.common}</h2>
        <p><span className="label">Population:</span> {country?.population?.toLocaleString()}</p>
        <p><span className="label">Region:</span> {country?.region}</p>
        <p><span className="label">Capital:</span> {country?.capital}</p>
      </div>
    </div>
  );
};

export default CountryCard;
