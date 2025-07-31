import { useEffect, useState } from 'react';
import './countryDetail.css';
import { useNavigate, useParams } from 'react-router';

const CountryDetail = () => {
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

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
      <div className="back-button" onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="back-arrow">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <p>          
          Back
        </p>
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
            <p>
              <span className="label">Border Countries:</span>
              {country?.borders && country.borders.length > 0 ? (
                country.borders.map((border, idx) => (
                  <span key={border} style={{ marginRight: '8px' }} className={"border"}>
                    {border}
                  </span>
                ))
              ) : (
                <span> No borders </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;