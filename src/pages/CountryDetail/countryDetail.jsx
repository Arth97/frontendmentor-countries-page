import { useEffect, useState } from 'react';
import './countryDetail.css';
import { useNavigate, useParams } from 'react-router';

const CountryDetail = () => {
  const [country, setCountry] = useState(null);

  const {cca3} = useParams();

  useEffect(() => {
		if (!cca3) return;
		fetchData()
	},[cca3]);

  const fetchData = async () => {
		try {
			const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
			const data = await response.json();
			setCountry(data[0]);
			return; 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}

  return (
    <div className="country-detail">
      <div className="back-button">
        flecha Back
      </div>
      <div className="country-detail-content">
        <div className="country-detail-flag">
          <img src={country?.flags?.svg} alt="Flag" className="country-detail-flag-img" />
        </div>
        <div className="card-content">
          <h1>{country?.name?.common}</h1>
          <div className="flex flex-row gap-10">
            <div>
              <p><span className="label">Native Name:</span> {country?.population?.toLocaleString()}</p>
              <p><span className="label">Population:</span> {country?.population?.toLocaleString()}</p>
              <p><span className="label">Region:</span> {country?.region}</p>
              <p><span className="label">Sub Region:</span> {country?.region}</p>
              <p><span className="label">Capital:</span> {country?.capital}</p>
            </div>
            <div>
              <p><span className="label">Top Level Domain:</span> {country?.capital}</p>
              <p><span className="label">Currencies:</span> {country?.capital}</p>
              <p><span className="label">Languages:</span> {country?.capital}</p>
            </div>
          </div>
          <div>
            <p><span className="label">Border Countries:</span> {country?.capital}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;