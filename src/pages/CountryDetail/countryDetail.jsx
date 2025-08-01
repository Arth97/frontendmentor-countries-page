import { useEffect, useState } from 'react';
import './countryDetail.css';
import { useNavigate, useParams } from 'react-router';

const CountryDetail = () => {
  const [country, setCountry] = useState(null);
  const [neighbours, setNeighbours] = useState(null);
  const navigate = useNavigate();

  const {cca3} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
        const data = await response.json();
        console.log("data", data);
        setCountry(data[0]);
        return; 
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

		if (!cca3) return;
		fetchData()
	},[cca3]);

  useEffect(() => {
    const fetchNeighbours = async () => {
      const neigh = country?.borders;
      if (!neigh || neigh.length === 0) {
        setNeighbours([]);
        return;
      }
      try {
        const responses = await Promise.all(
          neigh.map(async(code) => {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,cca3`);
            const data = await response.json();
            return data;
          })
        );
        setNeighbours(responses);
      } catch (err) {
        console.error('Error fetching neighbours:', err);
        setNeighbours([]);
      }
    }

		if (!country) return;
		fetchNeighbours()
	},[country]);

  const getNativeNames = (natName) => {
    if (!natName) return '';

    return Object.values(natName)
    .map(name => name.common)
    .join(', ');
  }

  const getLanguages = (country) => {
    const languages = country?.languages;
    if (!languages) return '';
    
    return Object.values(languages).join(' , ');
  }

  const getCurrencies = (country) => {
    const currencies = country?.currencies;
    if (!currencies) return '';
    
    return Object.values(currencies)
      .map(currency => currency.name)
      .join(' , ');
  }
  
  return (
    <div className="country-detail">
      <div className="back-button" onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="back-arrow">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
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
              <p className="mb-4"><span className="label">Native Name:</span>{getNativeNames(country?.name?.nativeName)}</p>
              <p className="mb-4"><span className="label">Population:</span> {country?.population?.toLocaleString()}</p>
              <p className="mb-4"><span className="label">Region:</span> {country?.region}</p>
              <p className="mb-4"><span className="label">Sub Region:</span> {country?.subregion}</p>
              <p className="mb-4"><span className="label">Capital:</span> {country?.capital}</p>
            </div>
            <div>
              <p className="mb-4"><span className="label">Top Level Domain:</span> {country?.tld}</p>
              <p className="mb-4"><span className="label">Currencies:</span> {getCurrencies(country)}</p>
              <p className="mb-4"><span className="label">Languages:</span> {getLanguages(country)}</p>
            </div>
          </div>
          <div className="h-auto w-full flex flex-row items-center gap-3">
            <p className="label">Border Countries:</p>
            <div className="neighbour-list">
              {neighbours && neighbours.length > 0 ?  (
                neighbours.map((neighbour, index) => (
                  <div key={index} className={"border"}  onClick={() => navigate(`/countryDetail/${neighbour.cca3}`)}>
                    {neighbour.name.common}
                  </div>
                ))
              ) : (
                <span> No borders </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;